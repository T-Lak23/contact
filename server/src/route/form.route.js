import express from "express";
import {
  createContatForm,
  deleteOne,
  getContactData,
} from "../controller/form.controller.js";
const router = express.Router();

router.post("/create-contact", createContatForm);
router.get("/contacts", getContactData);
router.delete("/contact/:id", deleteOne);
export default router;
