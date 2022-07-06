//Esse arquivo serve para auxiliar na hora de utilizar o jwt

import jwt from "jsonwebtoken";

const dados = { nome: "Alex Ferreira" };
const chaveSecreta = process.env.JWT_SECRET;
const configuracoes = { expiresIn: 60 * 60 * 24 * 30 }; // 30 dias em segundos

const token = jwt.sign(dados, chaveSecreta, configuracoes);

try {
  const dados = jwt.verify(token, chaveSecreta);
  // dados agora terá { nome: "Alex Ferreira" }
} catch {
  // se caiu aqui, o token é inválido ou foi adulterado ou passou da validade
}

// Guardar nos dados do JWT o **id da sessão** que criou no banco praquele login.
// E aí retornar o JWT pro front, da mesma forma comoretornava o uuid.

// No front, nada muda. Você vai receber esse token e persistir no front de alguma forma (por exemplo Local Storage) e
// re-enviar pro back a cada novo request, utilizando o header de Authorization

// Já no processo de autenticação do back, pra validar esse token terá dois passos: validar com o `jwt.verify` pra garantir
// que o token é íntegro e, em seguida, utilizar o id da sessão que veio dentro dele pra buscar a sessão do banco e identificar o usuário logado
