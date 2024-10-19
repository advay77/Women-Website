const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure multer to save audio files in the "uploads" folder
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Route to handle audio upload
app.post('/upload', upload.single('audio'), (req, res) => {
    console.log('Uploaded file:', req.file);
    res.status(200).send('Audio uploaded successfully!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
