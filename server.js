const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// players2.json file path
const DATA_PATH = path.join(__dirname, 'players2.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint jekhan theke frontend data nibe
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "File not found" });
        }
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    {
  "ads_config": {
    "reward_id": "YOUR_REWARD_ID",
    "banner_id": "YOUR_BANNER_ID"
  },
  "players": [...]
}
});
