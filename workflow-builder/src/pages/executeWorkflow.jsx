import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './styles.css';

const ExecuteWorkflow = () => {
  const [file, setFile] = useState(null);
  const [workflowId, setWorkflowId] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [workflowIds, setWorkflowIds] = useState([]);
  const [executionMessage, setExecutionMessage] = useState('');

  useEffect(() => {
    const fetchWorkflowIds = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/workflows');
        setWorkflowIds(response.data);
      } catch (error) {
        console.error('Error fetching workflow IDs:', error);
      }
    };
    fetchWorkflowIds();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !workflowId) {
      alert('Please select a file and workflow ID');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsExecuting(true);
      await axios.post(`https://localhost:5000/api/workflows/execute/${workflowId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setExecutionMessage('Workflow execution initiated');
    } catch (error) {
      console.error('Error executing workflow:', error);
      setExecutionMessage('Error executing workflow');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDropdownChange = (event) => {
    setWorkflowId(event.target.value);
  };

  return (
    <div className="execute-workflow-container">
      <h2 className="execute-workflow-header">Execute Workflow</h2>
      <div className="execute-workflow-form">
        <input type="file" onChange={handleFileChange} />
        <label htmlFor="workflowId">Select Workflow ID:</label>
        <select id="workflowId" onChange={handleDropdownChange} value={workflowId}>
          <option value="">Select Workflow</option>
          {workflowIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <button className="execute-workflow-button" onClick={handleSubmit} disabled={isExecuting}>
          {isExecuting ? 'Executing...' : 'Submit'}
        </button>
      </div>
      {executionMessage && <p className="execute-workflow-message">{executionMessage}</p>}
      {executionMessage && <p className="execute-workflow-error-message">{executionMessage}</p>}
    </div>
  );
};

export default ExecuteWorkflow;
