const express = require('express');
const assistantsRoutes = require('./routes/assistantsRoutes');
const promptsRoutes = require('./routes/promptsRoutes');
const filesRoutes = require('./routes/filesRoutes');
const userRoutes = require('./routes/usersRoutes');

const app = express();

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/assistants', assistantsRoutes);
app.use('/api/prompts', promptsRoutes);

module.exports = app;
