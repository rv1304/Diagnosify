const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  imagePath: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
  result: { type: Object, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;