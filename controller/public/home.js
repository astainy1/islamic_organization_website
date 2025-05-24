const bcrypt = require("bcrypt");
exports.getHome = (req, res) => {
  //   bcrypt.hash('@Admin4321', 10, (err, hash) => {
  //   console.log(hash);
  // });
  res.render("pages/home", {
    title: "Home - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postHome = (req, res) => {
  res.redirect("/");
};
