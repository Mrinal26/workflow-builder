import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Changed import to include Routes
import Home from './pages/home';
import ExecuteWorkflow from './pages/executeWorkflow';
import WorkflowBuilder from './components/workflowBuilder';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/workflow-builder">Workflow Builder</Link>
            </li>
            <li>
              <Link to="/execute-workflow">Execute Workflow</Link>
            </li>
          </ul>
        </nav>

        {/* Changed Router to Routes */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/workflow-builder" element={<WorkflowBuilder />} />
          <Route path="/execute-workflow" element={<ExecuteWorkflow />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
