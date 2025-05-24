const projectModel = require("../../models/projectModel");
const fs = require("fs");
const path = require("path");

// Add Project - Get Route
exports.getAddProject = (req, res) => {
  res.render("admin/addProject", {
    admin: req.session.admin ?? "Admin",
    title: "Add Project ",
  });
};


// Add Project - POST Route
exports.postAddProject = (req, res) => {
  const {
    title,
    summary,
    description,
    date,
    location,
    ongoing
  } = req.body;

  const cover_image = req.files?.cover_image?.[0]?.filename || null;
  const gallery = req.files?.gallery?.map(file => file.filename) || [];

  if (!cover_image) {
  return res.status(400).send("Cover image is required.");
}

  const projectData = {
    title,
    summary,
    description,
    date,
    location,
    ongoing: ongoing === "on" ? 1 : 0,
    cover_image
  };
  console.log(cover_image)

  projectModel.createProject(projectData, gallery, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    req.flash("success", "Project created successfully.");
    res.redirect("/admin/manage-project");
  });
};

// GET: Manage Projects
exports.getManageProject = (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  projectModel.getProjectsPaginated(search, limit, offset, (err, data, total) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    const totalPages = Math.ceil(total / limit);

    res.render('admin/manageProject', {
      projects: data,
      currentPage: page,
      totalPages,
      search,
      baseURL: process.env.BASE_URL,
      admin: req.session.admin ?? "Admin",
    title: "Manage Project ",
    });
  });
};

// Delete Project - Post Route
exports.deleteProject = (req, res) => {
  const projectId = req.params.id;

  // Get gallery and cover image first to delete them from disk
  projectModel.getProjectAssets(projectId, (err, assets) => {
    if (err) {
      console.error("Fetch assets error:", err);
      return res.status(500).send("Internal Server Error");
    }

    const { cover_image, gallery } = assets || {};

    // Delete the database record
    projectModel.deleteProjectById(projectId, (err) => {
      if (err) {
        console.error("Delete DB error:", err);
        return res.status(500).send("Could not delete project");
      }

      // Delete files from uploads folder
      if (cover_image) {
        fs.unlink(path.join("uploads/project", cover_image), () => {});
      }

      if (gallery && Array.isArray(gallery)) {
        gallery.forEach(img =>
          fs.unlink(path.join("uploads/project", img), () => {})
        );
      }

      req.flash("success", "Project deleted successfully.");
      res.redirect("/admin/manage-project");
    });
  });
};


// Show edit form
exports.getEditProject = (req, res) => {
  const projectId = req.params.id;

  projectModel.getProjectById(projectId, (err, project) => {
    if (err || !project) return res.status(404).send("Project not found");

    projectModel.getProjectGallery(projectId, (err, gallery) => {
      if (err) gallery = [];

      res.render("admin/editProject", {
        project,
        gallery,
        title: "Edit Project",
        admin: req.session.admin ?? "Admin",
    
      });
    });
  });
};

// Handle form submission
exports.postEditProject = (req, res) => {
  const projectId = req.params.id;
  const {
    title, summary, description, date,
    location, ongoing
  } = req.body;

  const newCover = req.files?.cover_image?.[0]?.filename || null;
  const newGallery = req.files?.gallery?.map(f => f.filename) || [];

  // Load old data to delete files if needed
  projectModel.getProjectAssets(projectId, (err, assets) => {
    if (err) return res.status(500).send("Failed to load assets");

    const updateData = {
      id: projectId,
      title,
      summary,
      description,
      date,
      location,
      ongoing: ongoing === "on" ? 1 : 0,
      cover_image: newCover || assets.cover_image
    };

    projectModel.updateProject(updateData, (err) => {
      if (err) return res.status(500).send("Update failed");

      if (newCover && assets.cover_image) {
        fs.unlink(path.join("uploads/project", assets.cover_image), () => {});
      }

      if (newGallery.length > 0) {
        projectModel.replaceGallery(projectId, newGallery, (err) => {
          if (err) console.error("Gallery update failed:", err);
        });
      }

      req.flash("success", "Project updated successfully.");
      res.redirect("/admin/manage-project");
    });
  });
};

exports.getViewProject = (req, res) => {
  const projectId = req.params.id;

  projectModel.getProjectById(projectId, (err, project) => {
    if (err || !project) {
      return res.status(404).render("admin/404", { title: "Not Found" });
    }

    projectModel.getProjectGallery(projectId, (err, gallery) => {
      if (err) gallery = [];

      res.render("admin/viewProject", {
        title: "View Project",
        project,
        gallery,
        admin: req.session.admin ?? "Admin",
      });
    });
  });
};
