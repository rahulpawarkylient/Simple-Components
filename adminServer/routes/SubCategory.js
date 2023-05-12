import express from "express";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from "../controllers/SubCategory.js";
const router = express.Router();

router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.post('/:id', createSubcategory);
router.put('/:categoryId/:subcategoryId', updateSubcategory);
router.delete('/:categoryId/:subcategoryId', deleteSubcategory);

export default router;