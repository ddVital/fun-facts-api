const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("home", { url: req.get("host"), title: "Home", layout: 'layout' });
});

module.exports = router;
