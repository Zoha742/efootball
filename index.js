require('dotenv').config();
const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Cloudinary ফোল্ডার থেকে অটোমেটিক ইমেজ রিট্রিভ করার API
app.get('/api/assets/:folder', async (req, res) => {
    try {
        const folderName = req.params.folder;
        const result = await cloudinary.search
            .expression(`folder:${folderName}/*`)
            .execute();
        
        const images = result.resources.map(file => ({
            url: file.secure_url,
            name: file.public_id.split('/').pop().replace(/_/g, ' ')
        }));
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: "Cloudinary Error" });
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
