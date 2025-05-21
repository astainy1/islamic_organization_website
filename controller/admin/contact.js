exports.getContact = (req, res) => {
  res.render("admin/contact", {
    admin: req.session.admin ?? "Admin",
    title: "Contact Page | Salem Bakhit High School",
  });
};

exports.postContact = (req, res) => {
  res.redirect(303, "/admin/contact");
};
