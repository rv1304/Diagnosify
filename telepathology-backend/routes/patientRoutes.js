// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { getPatients, getPatientById } = require('../controllers/patientController');

// Route to fetch all patients
router.get('/', getPatients);

// Route to fetch patient by ID
router.get('/:id', getPatientById);

module.exports = router;
