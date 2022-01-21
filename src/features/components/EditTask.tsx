/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Modal, Select } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import {
  TaskType,
  taskEdited,
  taskRemoved,
  getTaskById,
} from '../task/taskSlice';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

type Props = {
  id: number;
};

function EditTask({ id }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const currentTask = useSelector(getTaskById(id));
  const [formData, setFormData] = useState<Omit<TaskType, 'id'>>();

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  useEffect(() => {
    setFormData({
      title: currentTask?.title,
      description: currentTask?.description,
      status: currentTask?.status,
    });
  }, [currentTask?.title, currentTask?.description, currentTask?.status]);

  useEffect(() => {
    if (!formData?.title) {
      setTitleError('Title is required!');
    } else {
      setTitleError('');
    }
  }, [formData?.title]);

  useEffect(() => {
    if (!formData?.description) {
      setDescError('Description is required!');
    } else {
      setDescError('');
    }
  }, [formData?.description]);

  const onEdit = (e: any): void => {
    e.preventDefault();
    if (formData?.title && formData?.description) {
      dispatch(
        taskEdited({
          ...formData,
          id,
        }),
      );
      setIsModalEditVisible(false);
    }
  };

  const onRemove = (e: any): void => {
    e.preventDefault();
    dispatch(taskRemoved({ id }));
    setIsModalDeleteVisible(false);
  };

  const handleCancel = (): void => {
    setIsModalDeleteVisible(false);
    setIsModalEditVisible(false);
  };

  const onChange = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onChangeStatus = (value: any): void => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const options = [];
  options.push(formData?.status);
  switch (formData?.status) {
    case 'ToDo':
      options.push('In Progress');
      break;
    case 'In Progress':
      options.push('Blocked');
      options.push('InQA');
      break;
    case 'Blocked':
      options.push('ToDo');
      break;
    case 'InQA':
      options.push('ToDo');
      options.push('Done');
      break;
    case 'Done':
      options.push('Deployed');
      break;
  }

  return (
    <>
      <Button
        type="primary"
        onClick={(): void => {
          setIsModalEditVisible(true);
        }}
      >
        <FormOutlined />
      </Button>
      <Button
        type="primary"
        danger
        className="ml-1"
        onClick={(): void => {
          setIsModalDeleteVisible(true);
        }}
      >
        <CloseOutlined />
      </Button>
      <Modal
        visible={isModalEditVisible}
        title="Edit Task"
        onCancel={handleCancel}
        footer={[
          <Button
            key={'edit'}
            type="primary"
            htmlType="submit"
            onClick={onEdit}
            className="w-full"
          >
            Edit Task
          </Button>,
        ]}
      >
        <Form
          className="w-full"
          name="form"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Input
            placeholder="Title*"
            value={formData?.title}
            onChange={onChange}
            id="title"
          />
          {titleError && (
            <Typography.Text type={'danger'}>{titleError}</Typography.Text>
          )}
          <Input.TextArea
            placeholder="Description*"
            value={formData?.description}
            onChange={onChange}
            id="description"
            className="mt-1"
          />
          {descError && (
            <Typography.Text type={'danger'}>{descError}</Typography.Text>
          )}
          <Select
            className="mt-1 w-full"
            defaultValue={formData?.status}
            onChange={onChangeStatus}
          >
            {options.map((s) => (
              <Select.Option key={s} value={s}>
                {s}
              </Select.Option>
            ))}
          </Select>
        </Form>
      </Modal>
      <Modal
        visible={isModalDeleteVisible}
        title="Remove Task"
        onCancel={handleCancel}
        footer={[
          <Button
            key={'remove'}
            type="primary"
            htmlType="submit"
            onClick={onRemove}
            className="w-full"
            danger
          >
            Remove Task
          </Button>,
        ]}
      >
        {formData?.title}
      </Modal>
    </>
  );
}

export default EditTask;
