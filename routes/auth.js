const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");
const { validatePassword, validateEmail } = require("../utils/validateUserData");

const router = express.Router();

router.get("/login", async (req, res) => {
  res.render("login", { openTab: "login", layout: "login" });
});

router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register", {layout: "register" })
);

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];
  let invalidFields = [];

  if (!name || !email || !password) {
    errors.push({ msg: "Please enter all fields" });
    invalidFields.push();
  }

  if (validateEmail(email) === false) {
    errors.push({ msg: "Invalid email" });
    invalidFields.push("email");
  }

  if (password.length < 8) {
    errors.push({ msg: "This password is too easy, try again!" });
    invalidFields.push("password");
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      name,
      invalidFields,
      layout: "register",
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        invalidFields.push("email");

        res.render("register", {
          errors,
          name,
          email,
          invalidFields,
          layout: "register",
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

module.exports = router;
