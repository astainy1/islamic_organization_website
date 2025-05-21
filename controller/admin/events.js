//Event Module

// Add Event - Get Route
exports.getAddEvent = (req, res) => {
  res.render("admin/addevent", {
    admin: req.session.admin ?? "Admin",
    title: "Add Events | Salem Bakhit High School",
  });
};

// Add Event - Post Route
exports.postAddEvent = (req, res) => {
  res.redirect(303, "/admin/add-event");
};

// Manage All Event - Get Route
exports.getManageEvent = (req, res) => {
  res.render("admin/manageevent", {
    admin: req.session.admin ?? "Admin",
    title: "Manage Events | Salem Bakhit High School",
  });
}

// Edit Event - Get Route
exports.getEditEvent = (req, res) => {
  res.render("admin/editevent", {
    admin: req.session.admin ?? "Admin",
    title: "Edit Events | Salem Bakhit High School",
  });
};

// Edit Event - Post Route
exports.postEditEvent = (req, res) => {
  res.redirect(303, "/admin/view-event");
};

// View Event - Get Route
exports.getViewEvent = (req, res) => {
  res.render("admin/viewevent", {
    admin: req.session.admin ?? "Admin",
    title: "View Event | Salem Bakhit High School",
  });
};

// View Event - Post Route
