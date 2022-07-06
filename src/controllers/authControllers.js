import { db } from "../database/mongodb.js";
import {authSignUpSchema, authSignInSchema} from "../schemas/authSchemas.js";

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

export async function loginUser(req, res){
  try {
    const user = req.body;
    const validate = authSignInSchema.validate(user);

    if(validate.error){
      return res.status(422).send("Reveja os campos");
    };

    const registeredUser = await db.collection("users").findOne({email: user.email});

    if(!registeredUser){
      res.status(422).send("Email ou senha inválidos")
    };

    const correctPassword = bcrypt.compareSync(user.password, registeredUser.password);
    if(!correctPassword){
      res.status(422).send("Email ou senha inválidos")
    };

    const token = uuid();
    await db.collection('sessions').insertOne({ token, userId: registeredUser._id });

    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Houve um problema ao logar o usuário');
  }
}