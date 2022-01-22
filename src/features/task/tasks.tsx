import React from 'react';
import { useSelector } from 'react-redux';
import { getAllTasks, TaskType } from './taskSlice';
import TaskCard from '../components/TaskCard';
import { Row, Col, Typography } from 'antd';

function Tasks(): React.ReactElement {
  const tasks = useSelector(getAllTasks);
  const leftTasks: TaskType[] = [];
  const rightTasks: TaskType[] = [];

  tasks.forEach((task, index) => {
    index % 2 === 0 ? leftTasks.push(task) : rightTasks.push(task);
  });

  return (
    <div className="card-container">
      {tasks.length > 0 ? (
        <Row>
          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 9, offset: 2 }}>
            {leftTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
              />
            ))}
          </Col>

          <Col xs={{ span: 20, offset: 2 }} lg={{ span: 9, offset: 2 }}>
            {rightTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
              />
            ))}
          </Col>
        </Row>
      ) : (
        <Typography.Title level={3} className="text-center" type="secondary">
          There is no task!
        </Typography.Title>
      )}
    </div>
  );
}

export default Tasks;
