const documentModel = require("../../models/documentModel");

// GET: Render add document form
exports.getAddDocument = (req, res) => {
  res.render("admin/addDocument", {
    title: "Add New Document",
        admin: req.session.admin ?? "Admin",
  });
};

// POST: Handle document upload
exports.postAddDocument = (req, res) => {
  const { title, date, category } = req.body;

  if (!req.file) {
    req.flash("error", "PDF file is required.");
    return res.redirect("/admin/add-document");
  }

  const file_path = "/uploads/documents/" + req.file.filename;

  const documentData = {
    title,
    display_info: date,
    category,
    file_path
  };

  documentModel.insertDocument(documentData, (err) => {
    if (err) {
      console.error("Insert Error:", err);
      req.flash("error", "Failed to save document.");
      return res.redirect("/admin/add-document");
    }

    req.flash("success", "Document uploaded successfully.");
    res.redirect("/admin/manage-document");
  });
};


// Manage Document - Get Route

exports.getManageDocument = (req, res) => {
  const search = req.query.search || "";
  const category = req.query.category || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  documentModel.getFilteredDocuments(search, category, limit, offset, (err, docs, total) => {
    if (err) return res.status(500).send("Server error");

    const totalPages = Math.ceil(total / limit);
    res.render("admin/manageDocument", {
      documents: docs,
      search,
      category,
      currentPage: page,
      totalPages,
          admin: req.session.admin ?? "Admin",
    title: "Manage Documents",
    });
  });
};

exports.postDeleteDocument = (req, res) => {
  const id = req.params.id;
  documentModel.deleteDocumentById(id, (err) => {
    if (err) return res.status(500).send("Delete error");
    res.redirect("/admin/manage-document");
  });
};
