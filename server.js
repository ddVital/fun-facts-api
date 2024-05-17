const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cron = require("node-cron");

require("dotenv/config");

const app = express();

// Passport Config
require("./config/passport")(passport);

// import routes
const homeRoute = require("./routes/home");
const termsRoute = require("./routes/terms");
const apiRoute = require("./routes/api");
const docsRoute = require("./routes/docs");
const loginRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const newsletterRoute = require("./routes/newsletter");
const User = require("./models/User");

// Static
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout login", false);
app.set("layout docs", false);
app.set("layout error404", false);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/newsletter", newsletterRoute);
app.use("/api", apiRoute);
app.use("/docs", docsRoute);
app.use("/user", userRoute);
app.use("/", loginRoute);
app.use("/", termsRoute);
app.use("/", homeRoute);

// Custom middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).render('error404', { title: '404 - Not Found', layout: false});
});

// Custom middleware for handling 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error500', { title: '500 - Internal Server Error', layout: false });
});

// reset the daily usage of the user at midnight.
cron.schedule("0 0 0 * * *", async () => {
  const users = await User.find();

  users.forEach((user) => {
    user.dailyRequest = 0;
    user.save();
  });
});

const PORT = process.env.port || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("server is up and running already...");
});
