const express = require("express");

const router = express.Router();

router.get("/terms-conditions", async (req, res) => {
  res.render("terms", { url: req.get("host"), layout: 'layout', title: 'Terms & conditions' });
});

router.get("/privacy", async (req, res) => {
  res.render("privacy", { url: req.get("host"), layout: 'layout', title: 'Terms & conditions' });
});

module.exports = router;
