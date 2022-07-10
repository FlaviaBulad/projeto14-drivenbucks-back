import { db } from "../database/mongodb.js";

export async function addToBasket(req, res) {
  try {
    const { title, price } = req.body;
    await db.collection("basket").insertOne({
      title,
      price,
    });

    res.status(201).send("Produto adicionado ao carrinho com sucesso");
  } catch (error) {
    res
      .status(500)
      .send("Erro ao tentar adicionar um produto ao carrinho", error);
  }
}

export async function getBasket(req, res) {
  try {
    const products = await db.collection("basket").find({}).toArray();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("Erro ao tentar pegar os produtos do carrinho", error);
  }
}
