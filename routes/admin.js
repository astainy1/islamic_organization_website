const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const login = require("../controller/admin/login");
const event = require("../controller/admin/events");
const dashboard = require("../controller/admin/dashboard");
const logout = require("../controller/admin/logout");
const teacher = require("../controller/admin/teacher");
const classes = require("../controller/admin/classes");
const subject = require("../controller/admin/subject");
const gallery = require("../controller/admin/gallery");
const faculty = require("../controller/admin/faculty");
const home = require("../controller/admin/home");
const about = require("../controller/admin/about");
const history = require("../controller/admin/history");
const achievement = require("../controller/admin/achievement");
const contact = require("../controller/admin/contact");
const admission = require("../controller/admin/admission");
const testimony = require("../controller/admin/testimony");
const enquiry = require("../controller/admin/enquiry");
const settings = require("../controller/admin/settings");
const profile = require("../controller/admin/profile");

// GET login page
// router.get("/admin", login.getLogin);
router.get("/login", login.getLogin);

// POST login
router.post("/login", login.postLogin);

// Dashboard
router.get("/dashboard", auth, dashboard.getDashboard);

// Event
router.get("/add-event", auth, event.getAddEvent);
router.post("/add-event", auth, event.postAddEvent);
router.get("/manage-event", auth, event.getManageEvent);
router.get("/edit-event", auth, event.getEditEvent);
router.post("/edit-event", auth, event.postEditEvent);
router.get("/view-event", auth, event.getViewEvent);

// Teachers
router.get("/add-teacher", auth, teacher.getAddTeacher);
router.post("/add-teacher", auth, teacher.postAddTeacher);
router.get("/manage-teacher", auth, teacher.getManageTeacher);
router.post("/manage-teacher", auth, teacher.postManageTeacher);
router.get("/view-teacher", auth, teacher.getViewSingleTeacher);
router.get("/edit-teacher", auth, teacher.getEditTeacher);
router.post("/edit-teacher", auth, teacher.postEditTeacher);

// Classes
router.get("/add-class", auth, classes.getAddClass);
router.post("/add-class", auth, classes.postAddClass);
router.get("/manage-class", auth, classes.getManageClass);
router.post("/manage-class", auth, classes.postManageClass);

// Subjects
router.get("/add-subject", auth, subject.getAddSubject);
router.post("/add-subject", auth, subject.postAddSubject);
router.get("/manage-subject", auth, subject.getManageSubject);
router.post("/manage-subject", auth, subject.postManageSubject);

// Gellery
router.get("/add-gallery", auth, gallery.getAddGallery);
router.post("/add-gallery", auth, gallery.postAddGallery);
router.get("/manage-gallery", auth, gallery.getManageGallery);
router.post("/manage-gallery", auth, gallery.postManageGallery);

// Faculty
router.get("/add-faculty", auth, faculty.getFaculty);
router.post("/add-faculty", auth, faculty.postFaculty);
router.get("/manage-faculty", auth, faculty.getManageFaculty);
router.post("/manage-faculty", auth, faculty.postManageFaculty);

// Pages

// Home
router.get("/home", auth, home.getHome);
router.post("/home", auth, home.postHome);

// About
router.get("/about", auth, about.getAbout);
router.post("/about", auth, about.postAbout);

// History
router.get("/history", auth, history.getHistory);
router.post("/history", auth, history.postHistory);

// Achievement
router.get("/achievement", auth, achievement.getAchievement);
router.post("/achievement", auth, achievement.postAchievement);

// Contact
router.get("/contact", auth, contact.getContact);
router.post("/contact", auth, contact.postContact);

// Admission
router.get("/announce-admission", auth, admission.getAnnounceAdmission);
router.post("/announce-admission", auth, admission.postAnnounceAdmission);
router.get("/view-applicant", auth, admission.getViewApplicant);
router.post("/view-applicant", auth, admission.postViewApplicant);
router.get("/mail-applicant", auth, admission.getMailApplicant);
router.post("/mail-applicant", auth, admission.postMailApplicant);

// Testimony
router.get("/add-testimony", auth, testimony.getAddTestimony);
router.post("/add-testimony", auth, testimony.postAddTestimony);
router.get("/manage-testimony", auth, testimony.getManageTestimony);
router.post("/manage-testimony", auth, testimony.postManageTestimony);

// Enquiry
router.get("/view-enquiry", auth, enquiry.getViewEnquiry);
router.post("/view-enquiry", auth, enquiry.postViewEnquiry);
router.get("/reply-enquiry", auth, enquiry.getReplyEnquiry);
router.post("/reply-enquiry", auth, enquiry.postReplyEnquiry);

// Settings
router.get("/home-banner", auth, settings.getHomeBanner);
router.post("/home-banner", auth, settings.postHomeBanner);
router.get("/other-settings", auth, settings.getOtherSettings);
router.post("/other-settings", auth, settings.postOtherSettings);

// Profile
router.get("/user-profile", auth, profile.getViewProfile);
router.post("/user-profile", auth, profile.postViewProfile);
router.get("/edit-profile", auth, profile.getEditProfile);
router.post("/edit-profile", auth, profile.postEditProfile);

// Logout
router.get("/logout", logout.logout);

module.exports = router;
