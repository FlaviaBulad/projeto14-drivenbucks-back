import { db } from "../database/mongodb.js";
import { authSignUpSchema, authSignInSchema } from "../schemas/authSchemas.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  try {
    const newUser = req.body;

    const validate = authSignUpSchema.validate(newUser);

    if (validate.error) {
      return res.status(422).send("Reveja os campos");
    }

    const emailAlreadyRegistered = await db
      .collection("users")
      .findOne({ email: newUser.email });

    if (emailAlreadyRegistered) {
      return res.status(422).send("Email já cadastrado");
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
    console.error(error);
    res.status(500).send("Houve um problema ao tentar cadastrar o usuário");
  }
}

export async function loginUser(req, res) {
  try {
    const user = req.body;

    const validate = authSignInSchema.validate(user);

    if (validate.error) {
      return res.status(422).send("Reveja os campos");
    }

    const registeredUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (!registeredUser) {
      return res.status(422).send("Email ou senha inválidos");
    }

    const correctPassword = bcrypt.compareSync(
      user.password,
      registeredUser.password
    );
    if (!correctPassword) {
      return res.status(422).send("Email ou senha inválidos");
    }

    const token = uuid();
    await db
      .collection("sessions")
      .insertOne({ token, userId: registeredUser._id, basket: [] });

    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve um problema ao logar o usuário");
  }
}

export async function logoutUser(req, res) {
  try {
    const user = res.locals.user;

    await db.collection("sessions").deleteMany({ userId: user._id });

    res.status(200).send("Usuário deslogado");
  } catch (error) {
    console.log(error);
  }
}
