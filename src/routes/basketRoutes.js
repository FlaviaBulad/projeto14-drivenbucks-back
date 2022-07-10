import { Router } from "express";

import { getUser } from "../middlewares/userMiddleware.js";

import { addToBasket, getBasket } from "../controllers/basketControllers.js";

const router = Router();

router.use(getUser);

router.post("/basket", addToBasket);
router.get("/basket", getBasket);

export default router;
