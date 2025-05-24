// Import modal
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin");

// View Profile - Get Route
exports.getViewProfile = (req, res) => {
  res.render("admin/viewprofile", {
    admin: req.session.admin ?? "Admin",
    title: "User Profile",
  });
};

// View Profile - Post Route
exports.postViewProfile = (req, res) => {
  res.redirect("/admin/user-profile");
};

// Edit Profile - Get Route
exports.getEditProfile = (req, res) => {
  res.render("admin/editprofile", {
    admin: req.session.admin ?? "Admin",
    title: "Edit Profile ",
  });
};

// Edit Profile - Post Route

exports.postEditProfile = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phone,
      password,
      confirmPassword
    } = req.body;

    const profileImage = req.file ? req.file.filename : req.session.admin.profile_picture || "default-profile.png";

    // Input validation
    if (!name || !username || !email || !phone) {
      return res.status(400).send("All fields except password are required.");
    }

    // Password validation
    let hashedPassword = req.session.admin.password; // Default to existing password
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
      }

      if (password.length < 6) {
        return res.status(400).send("Password must be at least 6 characters long.");
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const data = {
      id: req.session.admin.id,
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      profileImage
    };

    // Update in DB
    Admin.updateProfile(data, (err, result) => {
      if (err) {
        console.error("Profile update failed:", err);
        return res.status(500).send("An error occurred while updating the profile.");
      }

      // Optionally update session with new info
      req.session.admin = {
        ...req.session.admin,
        name,
        username,
        email,
        phone,
        profile_picture: profileImage
      };

      res.redirect("/admin/user-profile");
    });
  } catch (err) {
    console.error("Error in profile update:", err);
    res.status(500).send("Server error.");
  }
};
