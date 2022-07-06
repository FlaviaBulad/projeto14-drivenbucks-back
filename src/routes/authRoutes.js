import { Router } from "express";

const router = Router();

router.post("/sign-up", CreateUser);

export default router;
