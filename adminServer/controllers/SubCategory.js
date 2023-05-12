import CategoryModel from "../models/Category.js";
import SubCategoryModel from "../models/SubCategory.js";

// export const getSubcategories = async (req, res) => {
//   try {
//     const subcategories = await SubCategoryModel.find();
//     res.status(200).json(subcategories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };
export const getSubcategories = async (req, res) => {
  const categoryId = req.query.category; // Get category id from query parameter
  const query = categoryId ? { category: categoryId } : {}; // Create query object based on whether category is specified

  try {
    const subcategories = await SubCategoryModel.find(query).populate("category"); // Fetch subcategories and corresponding category objects if category is specified
    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getSubcategoryById = async (req, res) => {
  const subcategoryId = req.params.id
  try {
    const subcategory = await SubCategoryModel.findById(subcategoryId);
    res.status(200).json(subcategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createSubcategory = async (req, res) => {
  const { subcategory, description } = req.body;
  const categoryId = req.params.id;
  console.log(categoryId);
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found..");
    }
    const newSubcategory = new SubCategoryModel({
      subcategory,
      description,
      category: category._id,
    });
    category.subcategories.push(newSubcategory._id);
    await Promise.all([newSubcategory.save(), category.save()]);
    res.json(newSubcategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const updateSubcategory = async (req, res) => {
  const { subcategory, description } = req.body;
  const { categoryId, subcategoryId } = req.params;
  try {
    const updatedSubcategory = await SubCategoryModel.findByIdAndUpdate(
      subcategoryId,
      { subcategory, description },
      { new: true }
    );
    if (!updatedSubcategory) {
      return res.status(404).send("Subcategory not found");
    }
    res.json(updatedSubcategory);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteSubcategory = async (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    category.subcategories.pull(subcategoryId);
    try {
      await SubCategoryModel.findByIdAndDelete(subcategoryId);
      await category.save();
      res.json({ message: "Subcategory deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
