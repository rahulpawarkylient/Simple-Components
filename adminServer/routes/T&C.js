import express from "express";
import { createTandC, getTandC, updateTandC } from "../controllers/T&C.js";

const router = express.Router();

//Contact Form to send email
router.post("/createT&C", createTandC);
router.get("/getT&C", getTandC);
router.put("/updateT&C/:id", updateTandC);


export default router;
