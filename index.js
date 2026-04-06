const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// প্লেয়ার ডাটা রিড করার API
app.get('/api/players', (req, res) => {
    res.sendFile(path.join(__dirname, 'players.json'));
});

// এডমিন থেকে ডাটা সেভ করার API
app.post('/api/save-player', (req, res) => {
    const newPlayer = req.body;
    const filePath = path.join(__dirname, 'players.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false });
        let json = JSON.parse(data);
        
        const entry = {
            id: Date.now().toString(),
            name: newPlayer.name,
            position: newPlayer.position || "N/A",
            image: newPlayer.image,
            stats: {
                attacking: { "Offensive": 85, "Ball Control": 88, "Dribbling": 82 },
                athleticism: { "Speed": 80, "Acceleration": 84, "Stamina": 78 }
            }
        };

        json[newPlayer.type].push(entry);
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
