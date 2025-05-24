exports.getDonation = (req, res) => {
  res.render("admin/donation", {
    title: "Donation",
    admin: req.session.admin ?? "Admin",
  });
};

exports.postDonation = (req, res) => {
  res.redirect(303, "/manage-donations");
};
