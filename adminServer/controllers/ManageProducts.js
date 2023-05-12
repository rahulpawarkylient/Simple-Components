import ProductModel from "../models/ManageProducts.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  //   console.log(req.file, req.body);
  try {
    const { productName, price, description, category, subcategory } = req.body;
    const image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    const newProduct = new ProductModel({
      image,
      productName,
      price,
      description,
      category,
      subcategory,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product add successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error." });
  }
};

// GET ALL PRODUCT
export const viewProduct = async (req, res) => {
  try {
    const productData = await ProductModel.find();
    res.status(200).json(productData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// GET BY ID PRODUCT
export const viewOneProduct = async (req, res) => {
  const productId = req.params.id; // get the product ID from the request parameters
  try {
    const productData = await ProductModel.findById(productId); // find the product by ID
    if (!productData) {
      // if product is not found
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productData); // send the product data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id; // get the product ID from the request parameters
  try {
    const productData = await ProductModel.findByIdAndDelete(productId); // find and delete the product by ID
    if (!productData) {
      // if product is not found
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" }); // send success message
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Edit Product
export const editProduct = async (req, res) => {
  const productId = req.params.id; // get the product ID from the request parameters
  const { productName, price, description, category, subcategory } = req.body; // get the updated product data from the request body
  try {
    let image;
    if (req.file) {
      image = req.file.path; // or req.file.buffer depending on how the image data is being sent
    }
    const productData = await ProductModel.findByIdAndUpdate(
      productId,
      { image, productName, price, description, category, subcategory },
      { new: true } // set { new: true } option to return the updated document
    ); // find and update the product by ID
    if (!productData) {
      // if product is not found
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productData); // send the updated product data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
