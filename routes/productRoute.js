import express from "express";
import { createProduct, getAllProduct, getProductById, deleteProductById, updateProductById } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import { admin } from "../middlewares/roleIdentification.js";
import {auth} from "../middlewares/tokenVerification.js";

const productRouter = express.Router();
// export const productRouter = express.Router();
// const upload = configureMulter();

productRouter.post('/createProduct',upload.single('productImage'),createProduct);
productRouter.get('/getAllProduct',admin,auth,getAllProduct);
productRouter.get('/getProductById/:id',getProductById);
productRouter.delete('/deleteProductById/:id',deleteProductById);
productRouter.put('/updateProductById/:id',updateProductById);

export default productRouter;

