import express from "express";
import { createFaq, deleteFaq, getFaq } from "../controllers/Faq.js";

const router = express.Router();

//Contact Form to send email
router.post("/faq-create", createFaq);
router.get("/getFaq", getFaq);
router.delete("/deleteFaq/:id", deleteFaq);


export default router;
