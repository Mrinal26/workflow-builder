const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const workflowRoutes = require('./src/routes/workflowRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mrinalkumar5046:mrinalmongodb1@cluster0.tuntrgh.mongodb.net/workflowDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/workflows', workflowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
