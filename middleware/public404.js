module.exports = (req, res, next) => {
  return res.status(404).render("pages/error/public404", {
    title: "404 | Page Not Found",
    url: req.originalUrl,
  });
};
