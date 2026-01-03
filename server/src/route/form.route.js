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

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default router;
