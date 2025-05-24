exports.getNews = (req, res) => {
  res.render("pages/news", {
    title: "News - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.postNews = (req, res) => {
  res.redirect(303, "/news");
};


