import { db } from "../database/mongodb.js";
import authSignUpSchema from "../schemas/authSchemas.js";

import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const newUser = req.body;

    const validate = authSignUpSchema.validate(newUser);

    if (validate.error) {
      return res.status(422).send("Reveja os campos");
    }

    const SALT = 10;
    const passwordHash = bcrypt.hashSync(newUser.password, SALT);

    await db.collection("users").insertOne({
      name: newUser.name,
      email: newUser.email,
      password: passwordHash,
    });

    res.status(200).send("Usuário cadastrado com sucesso");
  } catch (error) {
    console.error("Houve um problema ao tentar cadastrar o usuário");
    res.status(500).send("Houve um problema ao tentar cadastrar o usuário");
  }
}
