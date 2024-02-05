import express from "express";
import * as productController from "../controllers/productController.js";
import upload from '../config/multer.js'
import { authenticateAdmin,checkAdmin } from "../middlewares/authenticate.js";
const router = express.Router();


router.get('/',productController.getProducts)
router.get('/:id',productController.getProductById)
router.post('/',authenticateAdmin,checkAdmin,upload.single('image'),productController.addProduct)
router.put('/:id',authenticateAdmin,checkAdmin,upload.single('image'),productController.editProduct)
router.delete('/:id',authenticateAdmin, checkAdmin,productController.deleteProduct)

export default router;