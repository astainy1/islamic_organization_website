exports.getHeadQuarters = (req, res) => {
  res.render("admin/headquarters", {
    title: "Edit HeadQuarters",
    admin: req.session.admin,
  });
};

exports.postHeadQuarters = (req, res) => {
  res.redirect("/edit-hq");
};
