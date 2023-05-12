import express from "express";
import {
  createNotification,
  deleteNotification,
  getNotificationById,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/Notification.js";
const router = express.Router();

router.get("/", getNotifications);
router.get("/:id", getNotificationById);
router.post("/add", createNotification);
router.put("/:id", markNotificationAsRead);
router.delete("/:id", deleteNotification);


export default router;
