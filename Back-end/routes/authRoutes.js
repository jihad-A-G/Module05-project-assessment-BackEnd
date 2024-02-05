import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router.post("/admin-signup",authController.adminSignUp);
router.post("/admin-login",authController.adminLogin);


export default router;