import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AddTask from './features/components/AddTask';
import { Typography } from 'antd';

function App(): React.ReactElement {
  return (
    <div className="container">
      <Typography.Title>Task Management</Typography.Title>
      <AddTask />
    </div>
  );
}

export default App;
