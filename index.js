const express = require('express');
const cloudinary = require('cloudinary').v2;
const app = express();

cloudinary.config({ 
  cloud_name: 'dyqegwdme', 
  api_key: 'YOUR_KEY', 
  api_secret: 'YOUR_SECRET' 
});

app.get('/api/assets/:folder', async (req, res) => {
    try {
        const folder = req.params.folder;
        let path = "";
        
        if(folder === 'legend') path = "Home/Legend_Cards/*";
        if(folder === 'manager') path = "Home/Manager/*";
        if(folder === 'event') path = "Home/Events/*";

        const result = await cloudinary.search
            .expression(`folder:${path}`)
            .execute();

        const assets = result.resources.map(file => ({
            url: file.secure_url,
            name: file.public_id.split('/').pop()
        }));
        res.json(assets);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
