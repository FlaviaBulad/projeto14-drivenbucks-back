import { db } from "../database/mongodb.js";
import authSignUpSchema from "../schemas/authSchemas.js";

import bcrypt from "bcrypt";

export async function CreateUser(req, res) {
  const newUser = req.body;

  await db.collection("users").insertOne({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  });

  res.status(200).send("Cadastrou");
}
