import express from "express";
import {
  addBlog,
  deleteBlog,
  updateBlog,
  viewBlog,
  viewOneBlog,
} from "../controllers/BlogManagement.js";
import multer from "multer";

const router = express.Router();

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

router.post("/addblog", upload.single("image"), addBlog); // BLog Add API
router.put("/updateblog/:id", upload.single("image"), updateBlog); // update Blog
router.get("/viewblog", viewBlog); // view BLog
router.get("/viewblog/:id", viewOneBlog); // view One BLog
router.delete("/deleteblog/:id", deleteBlog); // Delete BLog

export default router;
