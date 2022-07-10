import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";

import productsRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(productsRoutes);
app.use(basketRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server running on port: ${PORT}`));
});
