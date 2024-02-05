import express from "express";
import * as productController from "../controllers/productController.js";
import upload from '../config/multer.js'
import { authenticateAdmin } from "../middlewares/authenticate.js";
const router = express.Router();


router.get('/',authenticateAdmin,productController.getProducts)
router.get('/:id',productController.getProductById)
router.post('/',upload.single('image'),productController.addProduct)
router.put('/:id',upload.single('image'),productController.editProduct)
router.delete('/:id', productController.deleteProduct)

export default router;