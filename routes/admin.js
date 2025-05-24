const express = require("express");
const router = express.Router();

// Import Middleware
const auth = require("../middleware/auth");
const userProfileUpload = require("../middleware/userProfile");
const uploadProgram = require("../middleware/programUpload");

// Import Controller
const login = require("../controller/admin/login");
const logout = require("../controller/admin/logout");
const dashboard = require("../controller/admin/dashboard");
const media = require("../controller/admin/media");
const home = require("../controller/admin/home");
const about = require("../controller/admin/about");
const contact = require("../controller/admin/contact");
const testimonial = require("../controller/admin/testimonials");
const settings = require("../controller/admin/settings");
const profile = require("../controller/admin/profile");
const programs = require("../controller/admin/programs");
const projects = require("../controller/admin/projects");
const documents = require("../controller/admin/documents");
const news = require("../controller/admin/news");
const leader = require("../controller/admin/leadership");
const partner = require("../controller/admin/partners");
const donation = require("../controller/admin/donation");
const message = require("../controller/admin/messages");
const hq = require("../controller/admin/headquarters");

// Test
// console.log(programs);

// Login - Get Route
// router.get("/admin", login.getLogin);
router.get("/login", login.getLogin);

// Login - Post Route
router.post("/login", login.postLogin);

// Dashboard
router.get("/dashboard", auth, dashboard.getDashboard);

// Media Routes
router.get("/add-media", auth, media.getAddMedia);
router.post("/add-media", auth, media.postAddMedia);
router.get("/manage-media", auth, media.getManageMedia);
router.post("/manage-media", auth, media.postManageMedia);

// Home Page Routes
router.get("/home", auth, home.getHome);
router.post("/home", auth, home.postHome);

// About Page Route
router.get("/edit-about", auth, about.getAbout);
router.post("/edit-about", auth, about.postAbout);

// Contact Page Routes
router.get("/edit-contact", auth, contact.getContact);
router.post("/edit-contact", auth, contact.postContact);

// Programs Page Routes
router.get("/add-program", auth, programs.getAddProgram);
router.post("/add-program", auth, uploadProgram.programUploads, programs.postAddProgram);
router.get("/manage-program", auth, programs.getManageProgram);
router.post("/delete-program/:id", auth, programs.deleteProgram);
router.get("/edit-program/:id", auth, programs.getEditProgram);
router.post("/edit-program/:id", auth, uploadProgram.programUploads, programs.postEditProgram);
router.get("/view-program/:id", auth, programs.viewProgram);


// Projects Page Routes
router.get("/add-project", auth, projects.getAddProject);
router.post("/add-project", auth, projects.postAddProject);
router.get("/manage-project", auth, projects.getManageProject);
router.post("manage-project", auth, projects.postManageProject);

// Testimonial Routes
router.get("/add-testimonial", auth, testimonial.getAddTestimonial);
router.post("/add-testimonial", auth, testimonial.postAddTestimonial);
router.get("/manage-testimonials", auth, testimonial.getManageTestimonial);
router.post("/manage-testimonials", auth, testimonial.postManageTestimonial);

// Upload Documents Routes
router.get("/add-document", auth, documents.getAddDocument);
router.post("/add-document", auth, documents.postAddDocument);
router.get("/manage-document", auth, documents.getManageDocument);
router.post("/manage-document", auth, documents.postManageDocument);

// News Routes
router.get("/add-news", auth, news.getAddNews);
router.post("/add-news", auth, news.postAddNews);
router.get("/manage-news", auth, news.getManageNews);

// Leadership Routes
router.get("/add-leader", auth, leader.getAddLeader);
router.post("/add-leader", auth, leader.postAddLeader);
router.get("/manage-leaders", auth, leader.getManageLeader);
router.post("/manage-leaders", auth, leader.postManageLeader);

// Partners Routes
router.get("/add-partner", auth, partner.getPartner);
router.post("/add-partner", auth, partner.postPartner);
router.get("/manage-partners", auth, partner.getManagePartner);
router.post("/manage-partners", auth, partner.postManagePartner);

// Donation Routes
router.get("/manage-donations", auth, donation.getDonation);
router.post("/manage-donations", auth, donation.postDonation);

// Headquarters Routes
router.get("/edit-hq", auth, hq.getHeadQuarters);
router.post("/edit-hq", auth, hq.postHeadQuarters);

// Message Routes
router.get("/messages", auth, message.getMessage);
router.post("/messages", auth, message.postMessage);

// Settings Routes
router.get("/settings", auth, settings.getSiteSettings);
router.post("/settings", auth, settings.postSiteSettings);

// Profile Routes
router.get("/user-profile", auth, profile.getViewProfile);
router.post("/user-profile", auth, profile.postViewProfile);
router.get("/edit-profile", auth, profile.getEditProfile);
router.post(
  "/edit-profile",
  auth,
  userProfileUpload.single("profileImage"),
  profile.postEditProfile
);

// Logout Route
router.get("/logout", logout.logout);

module.exports = router;
