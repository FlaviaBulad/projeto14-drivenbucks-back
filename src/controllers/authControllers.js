import { db } from "../database/mongodb.js";
import { authSignUpSchema } from "../schemas/authSchemas.js";

import bcrypt from "bcrypt";

export async function CreateUser(req, res) {
  const newUser = req.body;
}
