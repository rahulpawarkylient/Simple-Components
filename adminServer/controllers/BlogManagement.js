import blogModel from "../models/BlogManagement.js";

// ADD Blog
export const addBlog = async (req, res) => {
  //   console.log(req.file, req.body);
  try {
    const { title, description } = req.body;
    const image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    const newBlog = new blogModel({
      image,
      title,
      description,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog add successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error." });
  }
};

// GET ALL Blog
export const viewBlog = async (req, res) => {
  try {
    const blogData = await blogModel.find();
    res.status(200).json(blogData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET BY ID PRODUCT
export const viewOneBlog = async (req, res) => {
  const blogId = req.params.id; // get the product ID from the request parameters
  try {
    const blogData = await blogModel.findById(blogId); // find the product by ID
    if (!blogId) {
      // if product is not found
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blogData); // send the product data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Edit Blog
export const updateBlog = async (req, res) => {
  const blogId = req.params.id; // get the blog ID from the request parameters
  const { title, description } = req.body; // get the updated blog data from the request body
  try {
    let image;
    if (req.file) {
      image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    }
    const blogData = await blogModel.findByIdAndUpdate(
      blogId,
      { image, title, description },
      { new: true } // set { new: true } option to return the updated document
    ); // find and update the blog by ID
    if (!blogData) {
      // if blog is not found
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blogData); // send the updated product data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id; // get the blog ID from the request parameters
  try {
    const blogData = await blogModel.findByIdAndDelete(blogId); // find and delete the blog by ID
    if (!blogData) {
      // if blog is not found
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" }); // send success message
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
