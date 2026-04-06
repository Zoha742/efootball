const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// ১. মিডেলওয়্যার সেটআপ
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ২. ডাটাবেস (players.json) চেক করা ও লোড করা
const DATA_PATH = path.join(__dirname, 'players.json');

// যদি players.json না থাকে, তবে একটি ডিফল্ট স্ট্রাকচার তৈরি করবে
if (!fs.existsSync(DATA_PATH)) {
    const initialData = {
        legend: [],
        manager: [],
        event: []
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(initialData, null, 2));
}

// ৩. মেইন রুট (index.html লোড করার জন্য)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ৪. API: প্লেয়ার এবং ম্যানেজার ডাটা পাঠানোর জন্য
app.get('/api/players', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Data read failed" });
        }
        res.json(JSON.parse(data));
    });
});

// ৫. Admin API: নতুন কার্ড বা ইভেন্ট অ্যাড করার জন্য (ID Based)
app.post('/api/save-card', (req, res) => {
    const { type, name, position, image, stats } = req.body;

    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false });
        
        let db = JSON.parse(data);
        
        const newEntry = {
            id: Date.now().toString(), // ইউনিক আইডি জেনারেট
            name: name,
            position: position || "N/A",
            image: image,
            stats: stats || {
                attacking: { "Offensive": 90, "Ball Control": 90 },
                athleticism: { "Speed": 85, "Acceleration": 85 }
            }
        };

        if (db[type]) {
            db[type].push(newEntry);
            fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2), (err) => {
                if (err) return res.status(500).json({ success: false });
                res.json({ success: true, message: "Added successfully!" });
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid type" });
        }
    });
});

// ৬. পোর্ট সেটআপ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
    console.log(`Command Status: Part 1 & 2 Integrated Successfully.`);
});
