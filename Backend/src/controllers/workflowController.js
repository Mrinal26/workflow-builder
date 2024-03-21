const Workflow = require('../models/workflow');
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');

exports.saveWorkflow = async (req, res) => {
  try {
    const { workflowData } = req.body;
    const workflowId = generateUniqueId();
    const workflow = new Workflow({ id: workflowId, data: workflowData });
    await workflow.save();
    res.json({ id: workflowId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.executeWorkflow = async (req, res) => {
  try {
    const { id } = req.params;
    const workflow = await Workflow.findOne({ id });
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }
    const tasks = workflow.data.tasks;
    await executeTasks(tasks); // Execute workflow tasks
    res.json({ message: 'Workflow executed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function executeTasks(tasks) {
  for (const task of tasks) {
    try {
      switch (task.type) {
        case 'Filter Data':
          // Implement logic to filter data
          break;
        case 'Wait':
          await wait(task.duration);
          break;
        case 'Convert Format':
          task.data = await convertFormat(task.data, task.format);
          break;
        case 'Send POST Request':
          await sendPostRequest(task.url, task.payload);
          break;
        default:
          console.log(`Unsupported task type: ${task.type}`);
      }
    } catch (error) {
      console.error(`Error executing task: ${error.message}`);
    }
  }
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration * 1000));
}

async function convertFormat(data, format) {
  if (format === 'CSV') {
    return await csvToJson(data);
  } else if (format === 'JSON') {
    return data;
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
}

function csvToJson(data) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(data)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

async function sendPostRequest(url, payload) {
  try {
    // Implement logic to send POST request
    console.log(`POST request sent to ${url}`);
  } catch (error) {
    console.error(`Error sending POST request to ${url}: ${error.message}`);
  }
}
