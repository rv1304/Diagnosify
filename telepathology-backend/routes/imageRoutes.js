// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processImage } = require('../controllers/imageController');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
    },
});

const upload = multer({ storage: storage });

// Route to upload image and process it
router.post('/upload', upload.single('image'), processImage);

module.exports = router;
