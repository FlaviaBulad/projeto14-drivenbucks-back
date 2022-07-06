import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";

//import routers here

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req ,res)=>{
    res.send("Servidor On");
})

//app.use routers here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`Server running on port: http://localhost:${PORT}`)
  );
});
