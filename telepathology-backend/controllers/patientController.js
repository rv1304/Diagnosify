// controllers/patientController.js
const Patient = require('../models/Patient');

// Fetch all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patients' });
    }
};

// Fetch a specific patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patient' });
    }
};

module.exports = { getPatients, getPatientById };
