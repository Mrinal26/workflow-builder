const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/', workflowController.saveWorkflow);

router.post('/:id/execute', workflowController.executeWorkflow);

module.exports = router;
