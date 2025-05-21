module.exports = (err, req, res, next) => {
  if (err) {
    console.error("Server error", err.stack);
  }
  res.status(500).render("admin/error/servererror", {
    error: err ?? "Something Went Wrong with our Server",
    title: "500 |Internal Server Error" ?? "500 - Server Error",
    url: req.originalUrl,
  });

  next();
};
