// controllers/imageController.js
const Patient = require('../models/Patient');
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');

// Function to preprocess the image and detect problems
const processImage = async (req, res) => {
    try {
        const { name, age, gender, contact } = req.body;
        const imagePath = req.file.path;

        // Process image and detect problems (replace with actual AI/ML model logic)
        const result = await detectProblem(imagePath);

        // Save patient and image details in MongoDB
        const newPatient = new Patient({
            name,
            age,
            gender,
            contact,
            imagePath,
            dateUploaded: new Date(),
            result,  // AI model result
        });

        await newPatient.save();

        res.status(200).json({
            message: 'Image uploaded and processed successfully',
            patient: newPatient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing image' });
    }
};

// Placeholder function for AI detection (replace with actual logic)
const detectProblem = async (imagePath) => {
    try {
        // Load AI/ML model (replace with actual model loading)
        const model = await tf.loadLayersModel('file://path_to_model/model.json');

        // Preprocess the image for the model (resize, normalize, etc.)
        const image = await tf.node.decodeImage(fs.readFileSync(imagePath));
        const resizedImage = tf.image.resizeBilinear(image, [224, 224]); // Example resize
        const inputTensor = resizedImage.expandDims(0); // Add batch dimension

        // Predict using the AI model
        const prediction = model.predict(inputTensor);
        const result = prediction.dataSync(); // Extract result from tensor

        // Simulate an AI model output (in reality, this should be based on the model's prediction)
        return {
            issue: result[0] > 0.5 ? 'Abnormality detected' : 'No abnormalities detected',
            description: result[0] > 0.5 ? 'Potential abnormality identified' : 'Image is normal',
        };
    } catch (error) {
        console.error('Error during AI detection:', error);
        return { issue: 'Error in detection', description: 'Unable to process image' };
    }
};

module.exports = { processImage };
