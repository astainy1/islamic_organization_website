// 404 Error
module.exports = (req, res, next) => {
  res.status(404).render("admin/error/notfound", {
    admin: req.session.admin ?? "Admin",
    title: "404 | Page Not Found",
    url: req.originalUrl,
  });
  next();
};
