//New Module
const newsModel = require("../../models/newsModel");
const fs = require("fs");
const path = require("path");

// Add New - Get Route
exports.getAddNews = (req, res) => {
  res.render("admin/addNews", {
    admin: req.session.admin ?? "Admin",
    title: "Add News",
  });
};

// Add New - Post Route
// Slugify Helper
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Add News - POST
exports.postAddNews = (req, res) => {
  const { title, summary, content, author, category, tags, post_date } =
    req.body;

  console.log(post_date);

  // Validate required fields
  if (!title || !summary || !content || !author || !category || !post_date) {
    return res.status(400).send("All fields are required.");
  }

  const slug = slugify(title);
  const cover_image = req.files?.cover_image?.[0]?.filename || null;
  const galleryArray = req.files?.gallery?.map((file) => file.filename) || [];
  const parsedTags = tags ? tags.split(",").map((tag) => tag.trim()) : [];

  const newsData = {
    title,
    slug,
    summary,
    content,
    author,
    category,
    cover_image,
    gallery: JSON.stringify(galleryArray),
    tags: JSON.stringify(parsedTags),
    post_date,
  };

  newsModel.insertNews(newsData, (err, result) => {
    if (err) {
      console.error("Error inserting news:", err);
      return res.status(500).send("Database error");
    }
    req.flash("success", "News post created successfully.");
    res.redirect("/admin/manage-news");
  });
};

// Manage All New - Get Route
exports.getManageNews = (req, res) => {
  const { search = "", category = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  newsModel.getNews(search, category, limit, offset, (err, result) => {
    // console.log('Result for Manage News', result)
    if (err) {
      console.error("Error listing news:", err);
      return res.status(500).send("Server Error");
    }

    res.render("admin/manageNews", {
      news: result.news,
      currentPage: parseInt(page),
      totalPages: Math.ceil(result.total / limit),
      search,
      category,
      admin: req.session.admin ?? "Admin",
      title: "Manage News",
    });
  });
};

// GET: View single news
exports.viewNews = (req, res) => {
  const { id } = req.params;

  newsModel.getNewsById(id, (err, news) => {
    if (err || !news) {
      console.error("Error viewing news:", err);
      return res.status(404).send("News not found");
    }

    res.render("admin/viewNews", {
      news,
      admin: req.session.admin ?? "Admin",
      title: "Manage News",
    });
  });
};

// GET: Edit News Form
exports.getEditNews = (req, res) => {
  const id = req.params.id;
  newsModel.getNewsById(id, (err, news) => {
    if (err || !news) {
      console.error("Error fetching news for edit:", err);
      return res.status(404).send("News not found");
    }

    if (news.tags && typeof news.tags === "string") {
  try {
    news.tags = JSON.parse(news.tags);
  } catch {
    news.tags = news.tags.split(",").map(tag => tag.trim());
  }
}

if (news.gallery && typeof news.gallery === "string") {
  try {
    news.gallery = news.gallery.includes("[")
      ? JSON.parse(news.gallery)
      : news.gallery.split(",").map(img => img.trim());
  } catch (e) {
    news.gallery = [];
  }
}

    res.render("admin/editNews", {
      news,
      admin: req.session.admin ?? "Admin",
      title: "Edit News"
    });
  });
};

// POST: Handle Edit News Submission
exports.postEditNews = (req, res) => {
  const id = req.params.id;
  const {
    title,
    summary,
    content,
    author,
    category,
    tags,
    post_date,
    existing_cover_image,
    existing_gallery
  } = req.body;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const cover_image = req.files?.cover_image?.[0]?.filename || existing_cover_image;

  let gallery = [];
  if (req.files?.gallery && req.files.gallery.length > 0) {
    gallery = req.files.gallery.map(f => f.filename);
  } else if (existing_gallery) {
    try {
      gallery = existing_gallery.includes("[")
        ? JSON.parse(existing_gallery)
        : existing_gallery.split(",").map(f => f.trim());
    } catch (err) {
      console.error("Gallery parse error:", err);
      gallery = [];
    }
  }

  const parsedTags = tags
    ? tags.includes("[")
      ? (() => {
          try {
            return JSON.parse(tags);
          } catch (err) {
            console.warn("Tags parse fallback:", err);
            return tags.split(",").map(t => t.trim());
          }
        })()
      : tags.split(",").map(t => t.trim())
    : [];

  const updatedNews = {
    id,
    title,
    slug,
    summary,
    content,
    author,
    category,
    cover_image,
    gallery,
    tags: parsedTags,
    post_date
  };

  newsModel.updateNews(updatedNews, err => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Update failed");
    }
    req.flash("success", "News updated successfully.");
    res.redirect("/admin/manage-news");
  });
};



// DELETE News
exports.deleteNews = (req, res) => {
  const { id } = req.params;

  newsModel.getNewsById(id, (err, news) => {
    if (err || !news) return res.status(404).send("News not found");

    // Delete cover image
    if (news.cover_image) {
      fs.unlink(path.join("uploads/news", news.cover_image), (err) => {
        if (err) console.error("Error deleting cover image:", err);
      });
    }

    // Delete gallery images safely
    let galleryImages = [];
    try {
      galleryImages =
        typeof news.gallery === "string"
          ? JSON.parse(news.gallery)
          : Array.isArray(news.gallery)
          ? news.gallery
          : [];
    } catch (e) {
      console.error("Error parsing gallery JSON:", e);
    }

    galleryImages.forEach((img) => {
      fs.unlink(path.join("uploads/news", img), (err) => {
        if (err) console.error("Error deleting gallery image:", err);
      });
    });

    // Delete from DB
    newsModel.deleteNews(id, (err) => {
      if (err) {
        console.error("Error deleting news:", err);
        return res.status(500).send("Delete failed");
      }

      res.redirect("/admin/manage-news");
    });
  });
};
