const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_PATH = path.join(__dirname, 'players.json');

// ১. পজিশন অনুযায়ী প্লেয়ার ফিল্টার করার API (Player ID 1 এর জন্য)
app.get('/api/players/position/:pos', (req, res) => {
    const position = req.params.pos.toUpperCase();
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Data read error" });
        const db = JSON.parse(data);
        // player অ্যারে থেকে নির্দিষ্ট পজিশন ফিল্টার
        const filtered = db.player.filter(p => p.position === position);
        res.json(filtered);
    });
});

// ২. লিজেন্ড কার্ডের লিস্ট পাওয়ার API (Legend ID 4 এর জন্য)
app.get('/api/legends', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Data read error" });
        const db = JSON.parse(data);
        res.json(db.legend || []);
    });
});

// ৩. নির্দিষ্ট প্লেয়ারের ডিটেইলস পাওয়ার API (Card Click এর জন্য)
app.get('/api/player-details/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Data read error" });
        const db = JSON.parse(data);
        // সব ক্যাটাগরি থেকে আইডি ম্যাচ করানো
        const allPlayers = [...db.player, ...db.legend];
        const player = allPlayers.find(p => p.id === id);
        if (player) res.json(player);
        else res.status(404).json({ error: "Player not found" });
    });
});

// ৪. ইভেন্ট ডাটা পাওয়ার API (Event ID 3 এর জন্য)
app.get('/api/events', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Data read error" });
        const db = JSON.parse(data);
        res.json(db.event || []);
    });
});

// ৫. ইনডেক্স ফাইল সার্ভ করা
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
