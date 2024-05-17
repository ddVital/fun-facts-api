const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

module.exports = Newsletter;
