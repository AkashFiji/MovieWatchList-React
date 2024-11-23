// Express route to handle image upload
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // To create unique filenames

router.post('/image/base64ToPng', (req, res) => {
  const { image } = req.body; // base64 image data

  // Remove base64 prefix (data:image/png;base64,) if it exists
  const base64Data = image.replace(/^data:image\/png;base64,/, "");

  // Generate a unique filename
  const fileName = `${uuidv4()}.png`;

  // Define the path where the image will be stored
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Write the file to the server
  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).json({ error: 'Failed to save image' });
    }

    // Respond with the URL of the saved image
    res.json({ imgURI: `http://localhost:5000/uploads/${fileName}` });
  });
});

module.exports = router;
