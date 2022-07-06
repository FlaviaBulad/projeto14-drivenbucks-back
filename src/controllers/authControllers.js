import { db } from "../database/mongodb.js";
import authSignUpSchema from "../schemas/authSchemas.js";

import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const newUser = req.body;

  const SALT = 10;
  const passwordHash = bcrypt.hashSync(newUser.password, SALT);

  await db.collection("users").insertOne({
    name: newUser.name,
    email: newUser.email,
    password: passwordHash,
  });

  res.status(200).send("Usuário cadastrado com sucesso");
}
