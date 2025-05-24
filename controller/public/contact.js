exports.getContact = (req, res) => {
    res.render("pages/contact", {title: "Contact - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl})
}

exports.postContact = (req, res) => {
    res.redirect("Contact | Higher Lajinah for Islamic Affairs")
}