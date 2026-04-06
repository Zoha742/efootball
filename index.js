const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));

// মেইন পেজ লোড
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Cloudinary বা JSON থেকে ডাটা নেওয়ার API
app.get('/api/players', (req, res) => {
    res.sendFile(path.join(__dirname, 'players.json'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
