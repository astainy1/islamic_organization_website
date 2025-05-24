exports.getProgram = (req, res) => {
    res.render("pages/programs", {title: "Programs - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl})
}

exports.postProgram = (req, res) => {
    res.redirect(303,"/higher-lajinah/programs")
}


// Programs Detail

exports.getProgramDetails = (req, res) => {
  res.render("pages/programdetails", {title: "Programs Detail - Higher Lajinah for Islamic Affairs",
  description: "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
  url: req.originalUrl})
}

exports.postProgramDetails = (req, res) => {
  res.redirect(303, "/programs")
}