// View Enquiry - Get Route
exports.getMessage = (req, res) => {
  res.render("admin/message", {
    admin: req.session.admin ?? "Admin",
    title: "View Messages",
  });
};

// View Enquiry - Post Route
exports.postMessage = (req, res) => {
  res.redirect("/admin/messages");
};


