require('dotenv').config(); // এটি সবার উপরে দাও
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cloudinary = require('cloudinary').v2;

// Cloudinary কনফিগারেশন
cloudinary.config({ 
  cloud_name: 'dyqegwdme', 
  api_key: '485815672387742', 
  api_secret: 'FSQ8cdLrm7s20jZL9gUDr1cSeX8' 
});
