require('dotenv').config();
const express = require('express');
const path = require('path'); // এটি যোগ করা হয়েছে
const cloudinary = require('cloudinary').v2;
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT || 3000;

// স্ট্যাটিক ফাইল (HTML, CSS, JS) সার্ভ করার জন্য এটি দরকার
app.use(express.static(path.join(__dirname)));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// এখন সার্ভার ওপেন হলে index.html ফাইলটি দেখাবে
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

bot.launch().catch(err => console.error('Bot launch error:', err));
