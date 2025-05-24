exports.getDonate = (req, res) => {
  res.render("pages/donate", {
   title: "Donations - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl
  });
};

exports.postDonate = (req, res) => {
  const {amount, purpose} = req.body;
  console.log(`Donation of ${amount} USD for ${purpose}`)
  res.redirect(303, "/higher-lajinah/donation-transparency");
};
