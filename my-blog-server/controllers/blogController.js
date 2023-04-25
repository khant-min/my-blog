const Blog = require("../model/Blog");

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs)
    return res.status(204).json({ message: "No blogs have been created" });
  res.status(200).json(blogs);
};

const createBlogs = async (req, res) => {
  const { name, title, content } = req.body;
  if (!name || !title || !content)
    return res
      .status(400)
      .json({ message: "name, title and content are required" });

  try {
    const result = await Blog.create({ name, title, content });
    console.log(result);
    res.status(201).json({ success: "Blog was successfully created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateBlogs = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Blog ID is required" });

  const foundBlog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!foundBlog)
    return res
      .status(204)
      .json({ message: `No blogs matched ID ${req.body.id}` });

  if (req.body.name) foundBlog.name = req.body.name;
  if (req.body.title) foundBlog.title = req.body.title;
  if (req.body.content) foundBlog.content = req.body.content;
  const result = await foundBlog.save();
  res.status(200).json(result);
};

const deleteBlogs = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Blog ID is required" });

  const foundBlog = await Blog.findOne({ _id: req.body.id }).exec();
  if (!foundBlog)
    return res
      .status(204)
      .json({ message: `No blogs matched ID ${req.body.id}` });

  const result = await foundBlog.deleteOne({ _id: req.body.id });
  res.status(204).json(result);
};

module.exports = { getAllBlogs, createBlogs, updateBlogs, deleteBlogs };
