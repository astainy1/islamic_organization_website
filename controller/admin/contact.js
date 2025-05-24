exports.getContact = (req, res) => {
  res.render("admin/contact", {
    admin: req.session.admin ?? "Admin",
    title: "Edit Contact ",
  });
};

exports.postContact = (req, res) => {
  res.redirect(303, "/admin/edit-contact");
};
