// Add Testimonial - Get Route
exports.getAddTestimonial = (req, res) => {
  res.render("admin/addTestimonial", {
    admin: req.session.admin ?? "Admin",
    title: "Add Testimonial ",
  });
};

// Add Testimonial - Post Route
exports.postAddTestimonial = (req, res) => {
  res.redirect("/admin/add-testimonials");
};

// Manage Testimonial - Get Route
exports.getManageTestimonial = (req, res) => {
  res.render("admin/manageTestimonial", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Testimonial",
  });
};

exports.postManageTestimonial = (req, res) => {
  res.redirect("/admin/manage-testimonials");
};
