
import Blog from "../models/blogModal.js";

// ✅ Create a new blog post with Cloudinary Image Upload
export const createBlog = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBlog = new Blog({ title, description, date, imageUrl });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// ✅ Get all blogs
export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // Sort by newest first
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// ✅ Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// ✅ Delete a blog by ID
export const deleteBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    let imageUrl = req.file ? req.file.path : null; // New image if uploaded

    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // If no new image is uploaded, keep the existing one
    if (!imageUrl) {
      imageUrl = existingBlog.imageUrl;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, date, imageUrl },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};
