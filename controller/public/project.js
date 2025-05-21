exports.getProject = (req, res) => {
    res.render("pages/project", {title: "Projects | Home | Higher Lajinah for Islamic Affairs"})
}

exports.postProject = (req, res) => {
    res.redirect(303, "higher-lajinah/project")
}