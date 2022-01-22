import React from 'react';
import { Card, Badge } from 'antd';
import { TaskType } from '../task/taskSlice';
import EditTask from './EditTask';

type Props = TaskType;

function TaskCard({
  id,
  title,
  description,
  status,
}: Props): React.ReactElement {
  let color = '';
  switch (status) {
    case 'ToDo':
      color = 'cyan';
      break;
    case 'In Progress':
      color = 'purple';
      break;
    case 'InQA':
      color = 'volcano';
      break;
    case 'Blocked':
      color = 'red';
      break;
    case 'Done':
      color = 'green';
      break;
    case 'Deployed':
      color = 'magenta';
      break;
  }

  return (
    <Badge.Ribbon text={status} color={color}>
      <Card title={title} bordered={true} className="mb-1 w-full shadow">
        <div className="w-full card-desc">{description}</div>
        <div className="card-buttons">
          <EditTask id={id} />
        </div>
      </Card>
    </Badge.Ribbon>
  );
}

export default TaskCard;
