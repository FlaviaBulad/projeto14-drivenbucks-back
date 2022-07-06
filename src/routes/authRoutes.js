import { Router } from "express";

import { createUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);

export default router;
