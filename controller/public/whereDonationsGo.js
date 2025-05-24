exports.getWhereDonationsGo = (req, res) => {
  res.render("pages/whereDonationGo", {
   title: "Where Donations Go - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl
  });
};

exports.postWereDonationsGo = (req, res) => {
  res.redirect("/higher-lajinah/donation-transparency");
};
