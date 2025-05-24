const findUser = require("../../models/loginModel");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

exports.getLogin = (req, res) => {
  // console.log('Admin route')
  res.render("admin/login", {
    title: "Login",
  });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    req.flash("error", "Please enter username");
    return res.redirect(303, "/admin/login");
  }

  if (!password) {
    req.flash("error", "Please enter password");
    return res.redirect(303, "/admin/login");
  }

  findUser.findAdminCredentials(username, (err, results) => {
    if (err)
      return res.status(500).render("admin/error/servererror", {
        error: err ?? "Something Went Wrong with our Server",
        title: "500 |Internal Server Error" ?? "500 - Server Error",
        url: req.originalUrl,
      });
    if (results.length === 0) {
      console.log("Flash message");
      req.flash("error", "Invalid Credentials");
      console.log("error:", req.session.flash);
      return res.redirect(303, "/admin/login");
    }

    const admin = results[0];

    if (username !== admin.username) {
      req.flash("error", "Invalid Credentials");
      return res.redirect("/admin/login");
    }

    bcrypt.compare(password, admin.password, (err, match) => {
      if (err) {
        console.error("Error hashing user password.");
        return res.status(500).render("admin/error/servererror", {
          error: err ?? "Something Went Wrong with our Server",
          title: "500 |Internal Server Error" ?? "500 - Server Error",
          url: req.originalUrl,
        });
      }
      if (match) {
        req.session.admin = admin;
        // req.flash("success", "Successfully Login!");
        return res.redirect(303, "/admin/dashboard");
      } else {
        req.flash("error", "Invalid Credentials");
        return res.redirect(303, "/admin/login");
      }
    });
  });
};
