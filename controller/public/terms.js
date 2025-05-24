exports.getTermsConditions = (req, res) => {
  res.render("pages/termsConditions", {
    title: "Terms & Conditions - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

exports.getPrivacyPolicy = (req, res) => {
  res.render("pages/privacyPolicy", {
    title: "Privacy Policy - Higher Lajinah for Islamic Affairs",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
    url: req.originalUrl,
  });
};

// Term and privacy modal
exports.getTermsModal = (req, res) => {
  res.render("pages/termsModal");
};

exports.getPrivacyModal = (req, res) => {
  res.render("pages/privacyModal");
};
