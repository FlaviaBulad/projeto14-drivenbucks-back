import { Router } from "express";

import { createUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/sign-up", createUser);

export default router;
