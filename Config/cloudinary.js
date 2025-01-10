const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "jeyanth",
  api_key: "419961694114991",
  api_secret: "nZrE6LXZ3CD6qQ9Fuzx4D6taep4",
});

module.exports = cloudinary;
