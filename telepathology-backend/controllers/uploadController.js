const Patient = require('../models/Patient');
const path = require('path');

exports.uploadPatientData = async (req, res) => {
  try {
    const { name, age, gender, contact } = req.body;
    const imagePath = path.join(__dirname, '../uploads', req.file.filename);

    const newPatient = new Patient({
      name,
      age,
      gender,
      contact,
      imagePath,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload data' });
  }
};
