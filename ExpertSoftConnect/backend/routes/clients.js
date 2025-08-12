// routes/Clientss.js
const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients');

// Obtener todos los pacientes
router.get('/', ClientsController.getAllClients);

// Obtener un paciente por ID
router.get('/:id', ClientsController.getClients);

// Crear un nuevo paciente
router.post('/', ClientsController.createClients);

// Actualizar un paciente por ID
router.put('/:id', ClientsController.updateClients);

// Eliminar un paciente por ID
router.delete('/:id', ClientsController.deleteClients);

module.exports = router;