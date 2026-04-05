require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT || 3000;

// Cloudinary কনফিগারেশন (Render-এর Environment Variables থেকে ডাটা নিবে)
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// টেলিগ্রাম বট সেটআপ
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// বেসিক রাউট
app.get('/', (req, res) => {
  res.send('eFootball Mini App Server is Running!');
});

// সার্ভার চালু করা
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// বট লঞ্চ করা
bot.launch().catch(err => console.error('Bot launch error:', err));
