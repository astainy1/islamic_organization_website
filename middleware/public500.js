module.exports = (err, req, res, next) => {
  if (err) {
    return console.log("Internal Server Error:", err.stack || err.message);
  } else {
    return res.status(500).render("pages/error/public500", {
      title: "500 - Internal Server Error",
      url: req.originalUrl,
      // error: err,
    });
  }
};
