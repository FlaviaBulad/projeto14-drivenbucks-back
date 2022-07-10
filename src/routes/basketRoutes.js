import { Router } from "express";

const basketRouter = Router();

basketRouter.get("/basket", getBasket);

export default basketRouter;
