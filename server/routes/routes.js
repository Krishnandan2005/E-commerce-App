import express from 'express';
import {userSignup ,userLogin} from '../controllers/user.controller.js';
import { getProducts } from '../controllers/product.controller.js';
import { getProductById } from '../controllers/product.controller.js';
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();
router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);

router.post("/create-checkout-session", createCheckoutSession);


export default router;