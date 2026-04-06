require('dotenv').config();
const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// API to fetch images from specific folder
app.get('/api/assets/:folder', async (req, res) => {
    try {
        const folderName = req.params.folder;
        const result = await cloudinary.search
            .expression(`folder:${folderName}/*`)
            .sort_by('public_id', 'asc') // সিরিয়াল ঠিক রাখার জন্য (01, 02)
            .execute();
        
        const images = result.resources.map(file => ({
            url: file.secure_url,
            // ফাইল নেম থেকে আন্ডারস্কোর সরিয়ে নাম তৈরি
            name: file.public_id.split('/').pop().replace(/_/g, ' ')
        }));
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Cloudinary Fetch Error" });
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
