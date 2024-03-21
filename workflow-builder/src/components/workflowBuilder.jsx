import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const WorkflowBuilder = () => {
  const [elements, setElements] = useState([]);
  const [workflowId, setWorkflowId] = useState('');
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('nodeType');
    const position = { x: event.clientX, y: event.clientY };
    const newNode = { id: `${nodeType}-${Math.random()}`, type: nodeType, position };
    setElements((prevElements) => [...prevElements, newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const saveWorkflow = async () => {
    try {
      const response = await axios.post('https://localhost:5000/api/workflows/save', { elements });
      setWorkflowId(response.data.id);
      alert('Workflow saved successfully');
    } catch (error) {
      setError('Error saving workflow');
      console.error('Error saving workflow:', error);
    }
  };

  const loadWorkflow = async () => {
    try {
      const response = await axios.get(`https://localhost:5000/api/workflows/${workflowId}`);
      setElements(response.data.elements);
      alert('Workflow loaded successfully');
    } catch (error) {
      setError('Error loading workflow');
      console.error('Error loading workflow:', error);
    }
  };

  const executeWorkflow = async () => {
    try {
      setIsExecuting(true); 
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1-second task
        setProgress(i);
      }
      setIsExecuting(false);
      setProgress(0);
      alert('Workflow executed successfully');
    } catch (error) {
      setError('Error executing workflow');
      console.error('Error executing workflow:', error);
      setIsExecuting(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <h2>Workflow Builder</h2>
      <div
        style={{ width: '100%', height: '80vh', border: '1px solid #ddd' }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {/* Workflow Builder canvas */}
      </div>
      <div>
        <button onClick={saveWorkflow}>Save Workflow</button>
        <button onClick={loadWorkflow}>Load Workflow</button>
      </div>
      <h2>Execute Workflow</h2>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      <div>
        <button onClick={executeWorkflow} disabled={isExecuting}>
          {isExecuting ? 'Executing...' : 'Execute Workflow'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default WorkflowBuilder;
