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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/higher-lajinah", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.locals.baseURL = "/higher-lajinah";
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
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 mins
});

app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSIONKEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      // httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 hour
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
app.use("/higher-lajinah", publicRoutes);

// 404 and 500 Middleware
app.use("/higher-lajinah", publicPageNotFound); // 404 Middleware
app.use("/higher-lajinah", publicServerError); // Server Error

app.get("/", (req, res) => {
  return res.redirect("/higher-lajinah");
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
