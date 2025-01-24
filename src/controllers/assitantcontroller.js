// assistantsController.js

const { Assistant, User } = require('../models');
const openai = require('../openai');  // Importar configuración de OpenAI

// Obtener información de un asistente
const getAssistantData = async (req, res) => {
  try {
    const { assistantId } = req.params;  // Suponiendo que el ID de asistente viene por parámetro
    const apiKey = req.headers.authorization.split(' ')[1]; // Suponiendo que el API Key viene en el header de autorización

    // Realizar la llamada a OpenAI para obtener los datos del asistente
    const response = await openaiService.getAssistantById(apiKey, assistantId);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error obteniendo los datos del asistente:', error);
    res.status(500).json({ message: 'Error al obtener los datos del asistente' });
  }
};

// Actualizar los datos de un asistente
const updateAssistantData = async (req, res) => {
  try {
    const { assistantId } = req.params;
    const { newData } = req.body;  // Datos que deseas actualizar en el asistente
    const apiKey = req.headers.authorization.split(' ')[1]; // Suponiendo que el API Key viene en el header de autorización

    // Llamada a OpenAI para actualizar datos
    const response = await openaiService.updateAssistant(apiKey, assistantId, newData);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error actualizando los datos del asistente:', error);
    res.status(500).json({ message: 'Error al actualizar los datos del asistente' });
  }
};
// Asociar un asistente a un usuario
const associateAssistantToUser = async (req, res) => {
  const { userId, name, description } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const assistant = await Assistant.create({ userId, name, description });
    res.status(201).json(assistant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los asistentes de un usuario
const getUserAssistants = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [Assistant],
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.Assistants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los asistentes
const getAllAssistants = async (req, res) => {
  const { limit = 20, order = 'desc' } = req.query;
  const apiKey = req.headers.authorization.split(' ')[1]; // Suponiendo que el API Key viene en el header de autorización

  try {
    const response = await openaiService.listAssistants(apiKey, limit, order);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error obteniendo los asistentes:', error);
    res.status(500).json({ message: 'Error al obtener los asistentes' });
  }
};

const modifyAssistantPromptAndFile = async (req, res) => {
  const { assistantId } = req.params;
  const { instructions, file_search } = req.body;
  const apiKey = req.headers.authorization.split(' ')[1]; // Suponiendo que el API Key viene en el header de autorización

  try {
    // Recuperar el asistente existente
    const existingAssistant = await openaiService.getAssistantById(apiKey, assistantId);

    // Actualizar solo el prompt (instructions) y el archivo a subir al file search
    const updatedData = {
      instructions: instructions || existingAssistant.instructions,
      tools: [
        {
          type: 'file_search',
          file_search: file_search || existingAssistant.tools.find(tool => tool.type === 'file_search').file_search
        }
      ],
      model: existingAssistant.model,
      name: existingAssistant.name,
      description: existingAssistant.description,
      tool_resources: existingAssistant.tool_resources,
      metadata: existingAssistant.metadata,
      temperature: existingAssistant.temperature,
      top_p: existingAssistant.top_p,
      response_format: existingAssistant.response_format
    };

    const response = await openaiService.updateAssistant(apiKey, assistantId, updatedData);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error modificando el asistente:', error);
    res.status(500).json({ message: 'Error al modificar el asistente' });
  }
};

module.exports = { getAssistantData, updateAssistantData, associateAssistantToUser, getUserAssistants, getAllAssistants, modifyAssistantPromptAndFile };