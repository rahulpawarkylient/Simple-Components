import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  viewOneProduct,
  viewProduct,
} from "../controllers/ManageProducts.js";
import multer from "multer";

// Define the storage location and filename format for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // define the storage directory
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // define the filename format
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

// Define the Multer middleware with the storage option
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/addproduct", upload.single("image"), addProduct); // Product Add
router.get("/viewproduct", viewProduct); // Get all Products
router.get("/viewoneproduct/:id", viewOneProduct); // Get By Id One Product
router.delete("/deleteproduct/:id", deleteProduct); // Delete Product
router.put("/editproduct/:id", upload.single("image"), editProduct); // Edit Product

export default router;
