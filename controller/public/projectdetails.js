exports.getProjectDetails = (req, res) => {
  res.render("pages/projectdetails", {
    title: "Project Details",
    description:
      "Welcome to Higher Lajinah, Liberia’s Islamic organization for faith, education, and humanitarian service.",
      url: req.originalUrl,
    project: {
      title: "Masjid Noor Renovation",
      imageURL: "/images/project_1.jpg",
      date: "April 10, 2024",
      location: "Paynesville, Liberia",
      summary: "A full renovation of a collapsed masjid roof...",
      description: "This project aimed to rebuild...",
      ongoing: true,
      gallery: [
        "/images/project_1a.jpg",
        "/images/project_1b.jpeg",
        "/images/project_1c.jpeg",
      ],
    },
  });
};
