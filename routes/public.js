// Routes for school website
const express = require("express");
const router = express.Router();

// Import controllers
const home = require("../controller/public/home");
const about = require("../controller/public/about");
const projects = require("../controller/public/project");
const projectdetails = require("../controller/public/projectdetails");
const programs = require("../controller/public/programs");
const media = require("../controller/public/media");
const contact = require("../controller/public/contact");
const whereDonationGoe = require("../controller/public/whereDonationsGo");
const donation = require("../controller/public/donate");
const announcement = require("../controller/public/announcement");
const committee = require("../controller/public/committte");
const director = require("../controller/public/director");
const hq = require("../controller/public/hq");
const allDocuments = require("../controller/public/allDocuments");
const news = require("../controller/public/news");
const readnews = require("../controller/public/readNews");
const terms = require("../controller/public/terms");

// Home
router.get("/", home.getHome);
router.post("/", home.postHome);

// About
router.get("/about", about.getAbout);
router.post("/about", about.postAbout);

// Projects
router.get("/project", projects.getProject);
router.post("/project", projects.postProject);

// Project Details
router.get("/project-details", projectdetails.getProjectDetails);

// Programs
router.get("/programs", programs.getProgram);
router.post("/programs", programs.postProgram);
router.get("/program-details", programs.getProgramDetails);
router.post("/program-details", programs.postProgramDetails);

// Media
router.get("/media", media.getMedia);
router.post("/media", media.postMedia);

// Contact
router.get("/contact", contact.getContact);
router.post("/contact", contact.postContact);

// Where Donations Go
router.get("/donation-transparency", whereDonationGoe.getWhereDonationsGo);
router.post("/donation-transparency", whereDonationGoe.postWereDonationsGo);

// Donation
router.get("/donate", donation.getDonate);
router.post("/donate", donation.postDonate);

// Announcement
router.get("/announcement", announcement.getAnnouncement);

// Committee
router.get("/committee", committee.getCommitte);
router.post("/committee", committee.postCommittee);

// Director
router.get("/directors", director.getDirectors);
router.post("/directors", director.postDirectors);

// Headquarters
router.get("/hq", hq.getHQ);
router.post("/hq", hq.postHQ);

// All Documents
router.get("/resources", allDocuments.getAllDocuments);
router.post("/resources", allDocuments.postAllDocuments);

// News
router.get("/news", news.getNews);
router.post("/news", news.postNews);

// Read News
router.get("/read-news", readnews.getNewDetails);
router.get("/read-news", readnews.postNewDetails);

// Terms and Condition, Privacy Policy
router.get("/terms-conditions", terms.getTermsConditions);
router.get("/privacy-policy", terms.getPrivacyPolicy);

// Terms and Privacy Modal
router.get("/terms", terms.getTermsModal);
router.get("/privacy", terms.getPrivacyModal);
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
