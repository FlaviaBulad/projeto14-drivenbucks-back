import { Router } from "express";

import { CreateUser } from "../controllers/authControllers.js";

const router = Router();

router.post("/sign-up", CreateUser);

export default router;
