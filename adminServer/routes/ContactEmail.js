import express from "express";
import { ContactEmail } from "../controllers/ContactEmail.js";

const router = express.Router();

//Contact Form to send email
router.post("/send", ContactEmail);


export default router;
