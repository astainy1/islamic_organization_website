const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const flash = require("connect-flash");
require("dotenv").config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/salem-bakhit", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.locals.baseURL = "/salem-bakhit";
  next();
});

// View engine
app.set("view engine", "ejs");

// MySQL session store configuration
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSIONKEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: true,
      secure: false, // Set to true only if using HTTPS
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");
const auth = require("./middleware/auth");

// Custom Middlware
const adminPageNotFound = require("./middleware/admin404");
const adminServerError = require("./middleware/servererror");
const publicPageNotFound = require("./middleware/public404");
const publicServerError = require("./middleware/public500");

// Public routes
app.use("/salem-bakhit", publicRoutes);

// 404 and 500 Middleware
app.use("/salem-bakhit", publicPageNotFound); // 404 Middleware
app.use("/salem-bakhit", publicServerError); // Server Error

app.get("/", (req, res) => {
  return res.redirect("/salem-bakhit");
});

// Admin routes
app.use("/admin", adminRoutes);

// 404 and 500 Middleware
app.use("/admin", auth, adminPageNotFound); // 404 Middleware
app.use("/admin", adminServerError); // Server Error
// app.get("/admin", (req, res) => {
//   res.redirect("/admin/login");
// });

// Catching unexpected route hit
app.use((req, res, next) => {
  console.log("Unmatched route hit:", req.originalUrl);
  next();
});

// Server Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}
    Press Ctrl + C to quite...`)
);
