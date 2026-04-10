const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname)));

// API Route for Players
app.get('/api/players', (req, res) => {
    const data = fs.readFileSync('players2.json');
    res.json(JSON.parse(data));
});

// API Route for Legends
app.get('/api/legends', (req, res) => {
    const data = fs.readFileSync('legends.json');
    res.json(JSON.parse(data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
