const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/programs"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  }
});

const upload = multer({ storage });

exports.programUploads = upload.fields([
  { name: 'hero_image', maxCount: 1 },
  { name: 'cover_image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]);
