import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AddTask from './features/components/AddTask';

function App(): React.ReactElement {
  return (
    <div className="container">
      <AddTask />
    </div>
  );
}

export default App;
