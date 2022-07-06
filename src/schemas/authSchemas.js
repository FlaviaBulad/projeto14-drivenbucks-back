import joi from "joi";

const authSignUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required().label("Password"),
  confirm_password: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

export default authSignUpSchema;
