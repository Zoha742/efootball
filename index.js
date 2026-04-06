const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_PATH = path.join(__dirname, 'players.json');

// ১. ইউজার প্রোফাইল ডাটা পাওয়ার API (Username, Photo, Name)
app.get('/api/profile/:userId', (req, res) => {
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Data read error" });
        const db = JSON.parse(data);
        const user = db.users?.find(u => u.id === req.params.userId);
        if (user) res.json(user);
        else res.status(404).json({ error: "User not found" });
    });
});

// ২. My Coin এবং Wallet আপডেট করার API (Profile & Bank logic)
app.post('/api/wallet/update', (req, res) => {
    const { userId, action, amount } = req.body;
    // এখানে আপনার ডাটাবেসে কয়েন যোগ বা বিয়োগ করার লজিক থাকবে
    // যেমন: My Coin, Bank, Withdraw আপডেট করা
    res.json({ message: `${action} successful`, newBalance: 5000 });
});

// ৩. টাস্ক বাটন অ্যাকশন (Collect Coins)
app.post('/api/tasks/collect', (req, res) => {
    const { taskId, userId } = req.body;
    // টাস্ক কমপ্লিট হলে My Coin অপশনে কয়েন অ্যাড হবে
    fs.readFile(DATA_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "File error" });
        // কয়েন অ্যাড করার লজিক এখানে হবে
        res.json({ success: true, reward: "2K Coins added to My Coin" });
    });
});

// ৪. রেফারেল এবং উইথড্র অপশন লিস্ট
app.get('/api/profile/options', (req, res) => {
    const options = [
        { name: "My Coin", icon: "coin_icon.png" },
        { name: "Bank", icon: "bank_icon.png" },
        { name: "Wallet", icon: "wallet_icon.png" },
        { name: "Withdraw", icon: "withdraw_icon.png" },
        { name: "Referral", icon: "ref_icon.png" }
    ];
    res.json(options);
});

// ৫. ইনডেক্স ফাইল সার্ভ করা
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname)));

// হোম রুট
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// মাইনিনিং এবং টাস্ক ডাটা সেভ করার জন্য API (ভবিষ্যতের জন্য)
app.post('/api/save-progress', express.json(), (req, res) => {
    // এখানে ইউজারের প্রগ্রেস সেভ করার লজিক থাকবে
    res.json({ status: "success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
