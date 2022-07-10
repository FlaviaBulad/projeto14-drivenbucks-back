import { Router } from "express";
import { getProducts } from "../controllers/productsControllers.js";
import { getUser } from "../middlewares/userMiddleware.js";

const router = Router();

router.use(getUser);

router.get("/products", getProducts);

export default router;
