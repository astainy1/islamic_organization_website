exports.getAbout = (req, res) => {
  res.render("pages/about", { title: "About Us | Higher Lajinah for Islamic Affairs" });
};

exports.postAbout = (req, res) => {
    res.redirect("/about")
}
