// Routes for school website
const express = require("express");
const router = express.Router();
// Run this in a script or terminal
const bcrypt = require("bcrypt");

// Home
router.get("/", (req, res) => {
  //   bcrypt.hash('@Admin4321', 10, (err, hash) => {
  //   console.log(hash);
  // });
  res.render("pages/home", { title: "Home | Salem Bakhit High School" });
});

// About
router.get("/about", (req, res) => {
  res.render("pages/about", { title: "About Us | Salem Bakhit High School" });
});

// Subject
router.get("/subjects", (req, res) => {
  res.render("pages/subjects", {
    title: "Our Curriculum | Salem Bakhit High School",
  });
});

router.get("/subject-details", (req, res) => {
  res.render("pages/subjectdetails", {
    title: "Subject Details | Salem Bakhit High School",
  });
});

// Staff
router.get("/staff", (req, res) => {
  res.render("pages/staff", { title: "Our Staff | Salem Bakhit High School" });
});

router.get("/staff-details", (req, res) => {
  res.render("pages/staffdetails", {
    title: "Teacher Details | Salem Bakhit High School",
  });
});

// News/Events
router.get("/news", (req, res) => {
  res.render("pages/news", { title: "School News | Salem Bakhit High School" });
});
router.get("/read-news", (req, res) => {
  res.render("pages/readnews", {
    title: "School News | Salem Bakhit High School",
  });
});

// Contact

router.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact Us | Salem Bakhit High School",
  });
});

// Admission
router.get("/admission", (req, res) => {
  res.render("pages/admissionform", {
    title: "Admission Form | Salem Bakhit High School",
  });
});

// Faculty

router.get("/administrators", (req, res) => {
  res.render("pages/administrator", {
    title: "Administrators | Salem Bakhit High School",
  });
});

// Alumni
router.get("/alumni", (req, res) => {
  res.render("pages/alumni", {
    title: "Alumni | Salem Bakhit High School",
  });
});

// History
router.get("/history", (req, res) => {
  res.render("pages/history", {
    title: "History | Salem Bakhit High School",
  });
});

// Achievement

router.get("/achievements", (req, res) => {
  res.render("pages/achievements", {
    title: "Achievements | Salem Bakhit High School",
  });
});

// Gallery

router.get("/gallery", (req, res) => {
  res.render("pages/gallery", {
    title: "Gallery | Salem Bakhit High School",
  });
});

// Graduate
router.get("/graduate", (req, res) => {
  res.render("pages/graduate", {
    title: "Graduate | Salem Bakhit High School",
  });
});


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
  <!-- Add more URLs as needed --> `

  res.send(sitemap);
});



module.exports = router;
