// View Enquiry - Get Route
exports.getViewEnquiry = (req, res) => {
  res.render("admin/viewenquiry", {
    admin: req.session.admin ?? "Admin",
    title: "View Enquiry | Salem Bakhit High School",
  });
};

// View Enquiry - Post Route
exports.postViewEnquiry = (req, res) => {
  res.redirect("/admin/view-enquiry");
};

// Reply Enquiry - Get Route
exports.getReplyEnquiry = (req, res) => {
  res.render("admin/replyenquiry", {
    admin: req.session.admin ?? "Admin",
    title: "Reply Enquiry | Salem Bakhit High School",
  });
};

// Reply Enquiry - Post Route
exports.postReplyEnquiry = (req, res) => {
  res.redirect("/admin/reply-enquiry");
};
