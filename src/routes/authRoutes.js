import { Router } from "express";

import { createUser, loginUser, logoutUser } from "../controllers/authControllers.js";
import { getUser } from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);
router.delete("/logout",getUser, logoutUser);

export default router;
