const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
  id: String,
  data: Object,
});

module.exports = mongoose.model('Workflow', WorkflowSchema);
