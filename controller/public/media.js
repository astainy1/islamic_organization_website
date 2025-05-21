exports.getMedia = (req, res) => {
  res.render("pages/media", {
    title: "Media | Higher Lajinah for Islamic Affairs",
  });
};

exports.postMedia = (req, res) => {
  res.redirect(303, "higher-lajinah/media");
};
