/**
 * @swagger
 * components:
 *   schemas:
 *     Prompt:
 *       type: object
 *       required:
 *         - content
 *         - version
 *         - assistantId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del prompt
 *         content:
 *           type: string
 *           description: Contenido del prompt
 *         version:
 *           type: integer
 *           description: Versión del prompt
 *         assistantId:
 *           type: integer
 *           description: ID del asistente asociado al prompt
 *       example:
 *         content: Hola, soy tu asistente.
 *         version: 1
 *         assistantId: 1
 */

/**
 * @swagger
 * /prompts:
 *   post:
 *     summary: Crear un nuevo prompt
 *     tags: [Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prompt'
 *     responses:
 *       201:
 *         description: Prompt creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       500:
 *         description: Error en el servidor
 */

const express = require('express');
const { createPrompt, getPromptsByAssistant, deletePrompt } = require('../controllers/promptsController');
const router = express.Router();

router.post('/assistant/:assistantId', createPrompt); // Crear un prompt
router.get('/assistant/:assistantId', getPromptsByAssistant); // Obtener prompts por ID de asistente
router.delete('/:id', deletePrompt); // Eliminar un prompt por ID

module.exports = router;