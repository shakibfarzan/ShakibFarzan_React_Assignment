/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Modal } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { TaskType, taskAdded } from '../task/taskSlice';

function AddTask(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Omit<TaskType, 'id'>>({
    title: '',
    status: 'ToDo',
    description: '',
  });

  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!formData.title) {
      setTitleError('Title is required!');
    } else {
      setTitleError('');
    }
  }, [formData.title]);

  useEffect(() => {
    if (!formData.description) {
      setDescError('Description is required!');
    } else {
      setDescError('');
    }
  }, [formData.description]);

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleAddTask = (e: any): void => {
    e.preventDefault();
    if (formData?.title && formData?.description) {
      dispatch(
        taskAdded({
          ...formData,
        }),
      );
      setFormData({
        title: '',
        status: 'ToDo',
        description: '',
      });
      setIsModalVisible(false);
    }
  };

  const onChange = (e: any): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={(): void => {
          setIsModalVisible(true);
        }}
        className="mb-1 ml-4"
      >
        Add Task
      </Button>
      <Modal
        onCancel={handleCancel}
        title="Add Task"
        visible={isModalVisible}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            className="w-full mt-1"
            onClick={handleAddTask}
          >
            Add
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
            name="title"
          />
          {titleError && (
            <Typography.Text type={'danger'}>{titleError}</Typography.Text>
          )}
          <Input.TextArea
            placeholder="Description*"
            value={formData?.description}
            onChange={onChange}
            name="description"
            className="mt-1"
          />
          {descError && (
            <Typography.Text type={'danger'}>{descError}</Typography.Text>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default AddTask;
