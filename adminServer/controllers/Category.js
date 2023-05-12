import CategoryModel from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = new CategoryModel({
      category: category,
    });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const updateCategory = async (req, res) => {
  const { category } = req.body;
  const { id } = req.params;
  try {
    const newCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!newCategory) {
      return res.status(404).send("Category not found");
    }
    res.status(200).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    if (category.subcategories.length > 0) {
      return res.status(400).send("Cannot delete category with subCategory");
    }
    await CategoryModel.findByIdAndDelete(id);
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
