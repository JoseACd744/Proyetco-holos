/**
 * @swagger
 * components:
 *   schemas:
 *     Assistant:
 *       type: object
 *       required:
 *         - name
 *         - version
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del asistente
 *         name:
 *           type: string
 *           description: Nombre del asistente
 *         version:
 *           type: string
 *           description: Versión del asistente
 *         userId:
 *           type: integer
 *           description: ID del usuario propietario del asistente
 *       example:
 *         name: Assistant 1
 *         version: v1.0
 *         userId: 1
 */

/**
 * @swagger
 * /assistants:
 *   post:
 *     summary: Asociar un asistente a un usuario
 *     tags: [Assistants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assistant'
 *     responses:
 *       201:
 *         description: Asistente asociado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistant'
 *       500:
 *         description: Error en el servidor
 */


/**
 * @swagger
 * /assistants:
 *  get:
 *   summary: Obtener todos los asistentes
 * 

    *     responses:
    *       200:
    *        description: Lista de asistentes
    *       content:
    *        application/json:
    *        schema:
    *        type: array
    *       items:
    *       $ref: '#/components/schemas/Assistant'
    *      500:
    *      description: Error en el servidor
    */

/**
 * @swagger
 * /assistants/{id}:
 * put: Modificar el prompt y archivo de un asistente
 * 
 * summary: Modificar el prompt y archivo de un asistente
 * 
 *  responses:
 *  200:
 * description: Asistente modificado exitosamente
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Assistant'
 * 500:
 * description: Error en el servidor
 * 
 */
const express = require('express');
const { associateAssistantToUser, getAllAssistants, getAssistantById, deleteAssistant, getUserAssistants, modifyAssistantPromptAndFile } = require('../controllers/assitantcontroller');
const router = express.Router();

router.post('/', associateAssistantToUser); // Asociar un asistente a un usuario
router.get('/', getAllAssistants); // Obtener todos los asistentes
router.get('/:id', getAssistantById); // Obtener un asistente por ID
router.delete('/:id', deleteAssistant); // Eliminar un asistente por ID
router.get('/user/:userId', getUserAssistants); // Obtener asistentes por ID de usuario
router.put('/:assistantId', modifyAssistantPromptAndFile); // Modificar el prompt y archivo de un asistente

module.exports = router;