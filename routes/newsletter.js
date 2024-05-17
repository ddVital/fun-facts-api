const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

router.post("/subscribe", async (req, res) => {
	const { email } = req.body;
  const registeredEmail = await Newsletter.findOne({ email: email });
  let errors = [];

	const newsletter = new Newsletter(
		{
			email: req.body.email,
			
		},
		{ versionKey: false }
	);
    
  
	if (!email) {
		errors.push("Please let us know your email. 😊");
	}

	if (registeredEmail) {
		errors.push("You're already part of the team. ⚡");
	}

	if (errors.length > 0) {
    // res.render("home", { msg: errors, errors: true, title: "Home"});
    res.status(200).send(JSON.stringify({ msg: errors }, null, 2));
  } else {
	const newUser = await newsletter.save();
	console.log(newUser);
    res.status(200).send(JSON.stringify({ msg: "You're in a important list now. 🚀" }, null, 2));
    // res.render("home", { msg: "You're in a important list now. 🚀", title: "Home" });
	}
});

module.exports = router;