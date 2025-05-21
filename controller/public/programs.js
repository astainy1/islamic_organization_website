exports.getProgram = (req, res) => {
    res.render("pages/programs", {title: "Programs | "})
}

exports.postProgram = (req, res) => {
    res.redirect(303,"/higher-lajinah/programs")
}