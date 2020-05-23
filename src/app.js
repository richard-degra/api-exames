const express = require('express');
const cors = require('cors');

const app = express();

// Rotas da API 
const index = require('./routes/index');
const ExamRoute = require('./routes/exams.routes');
const LabsRoute = require('./routes/labs.routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', ExamRoute);
app.use('/api/', LabsRoute);

module.exports = app;

