import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AddTask from './features/components/AddTask';
import { Typography } from 'antd';
import Tasks from './features/task/tasks';

function App(): React.ReactElement {
  return (
    <div className="container">
      <div className="header">
        <Typography.Title level={2}>Task Management</Typography.Title>
        <AddTask />
      </div>
      <Tasks />
    </div>
  );
}

export default App;
