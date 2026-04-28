const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// স্ট্যাটিক ফাইল সার্ভ করার জন্য (index.html, CSS, JS)
app.use(express.static(path.join(__dirname)));

// JSON ডাটা হ্যান্ডেল করার জন্য
app.use(express.json());

// ডাটা পাথ (Render এ ফাইল খুঁজে পাওয়ার জন্য এটি সবচেয়ে নিরাপদ উপায়)
const DATA_PATH = path.join(__dirname, 'players.json');

// প্রধান রুট - index.html লোড করবে
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API রুট - যা থেকে আপনার অ্যাপ প্লেয়ার ডাটা নিবে
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading players.json:", err);
            return res.status(500).json({ error: "Could not read data file" });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).json({ error: "Invalid JSON format" });
        }
    });
});

// সার্ভার পোর্ট সেটআপ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
