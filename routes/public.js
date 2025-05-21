// Routes for school website
const express = require("express");
const router = express.Router();

// Import controllers
const home = require("../controller/public/home");
const about = require("../controller/public/about");
const project = require("../controller/public/project");
const programs = require("../controller/public/programs");
const media = require("../controller/public/media");
const contact = require("../controller/public/contact");

// Home
router.get("/", home.getHome);
router.post("/", home.postHome);

// About
router.get("/about", about.getAbout);
router.post("/about", about.postAbout);

// Projects
router.get("/project", project.getProject);
router.post("/project", project.postProject);

// Programs
router.get("/programs", programs.getProgram);
router.post("/programs", programs.postProgram);

// Media
router.get("/media", media.getMedia);
router.post("/media", media.postMedia);

// Contact
router.get("/contact", contact.getContact);
router.post("/contact", contact.postContact);


// Google SEO

router.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/salem-bakhit</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.example.com/salem-bakhit/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.example.com/salem-bakhit/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- Add more URLs as needed --> `;

  res.send(sitemap);
});

module.exports = router;
