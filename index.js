const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// JSON data route remains the same
const DATA_PATH = path.join(__dirname, 'players.json');
app.get('/api/data', express.json(), (req, res) => {
    // Logic for loading player/manager lists based on type
    res.json({ message: "Server Ready. Send player links for dynamic loading." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
