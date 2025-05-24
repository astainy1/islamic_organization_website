// Announce Admission - Get Route
exports.getAnnounceAdmission = (req, res) => {
  res.render("admin/announceadmission", {
    admin: req.session.admin ?? "Admin",
    title: "Announce Admission | Salem Bakhit High School",
  });
};

// Announce Admission - Post Route
exports.postAnnounceAdmission = (req, res) => {
  res.redirect(303, "/announce-admission");
};

// View Applicant - Get Route
exports.getViewApplicant = (req, res) => {
  res.render("admin/viewapplicant", {
    admin: req.session.admin ?? "Admin",
    title: "View Applicant | Salem Bakhit High School",
  });
};

// View Applicant - Post Route
exports.postViewApplicant = (req, res) => {
  res.render("admin/viewapplicant", {
    admin: req.session.admin ?? "Admin",
    title: "View Applicant | Salem Bakhit High School",
  });
};

// Mail Applicant - Get Route
exports.getMailApplicant = (req, res) => {
  res.render("admin/mailapplicant", {
    admin: req.session.admin ?? "Admin",
    title: "Mail Applicant | Salem Bakhit High School",
  });
};

// Mail Applicant = Post Route
exports.postMailApplicant = (req, res) => {
  res.redirect(303, "/admin/mail-applicant");
};
