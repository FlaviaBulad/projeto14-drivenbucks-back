import { db } from "../database/mongodb.js";

export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find({}).toArray();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Houve um problema ao tentar buscar os produtos");
  }
}
