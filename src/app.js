const express = require('express');
const cors = require('cors');

const app = express();

// Rotas da API 
const index = require('./routes/index');
const ExamRoute = require('./routes/exams.routes');
const LabsRoute = require('./routes/labs.routes');
const UnidRoute = require('./routes/unid.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', ExamRoute);
app.use('/api/', LabsRoute);
app.use('/api/', UnidRoute);

module.exports = app;

