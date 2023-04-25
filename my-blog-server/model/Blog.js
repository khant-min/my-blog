const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  name: { required: true, type: String },
  title: { required: true, type: String },
  content: { required: true, type: String },
});

module.exports = mongoose.model("Blog", blogSchema);
