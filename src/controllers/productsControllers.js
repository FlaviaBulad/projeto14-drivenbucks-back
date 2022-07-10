import { db } from "../database/mongodb.js";

export async function getProducts(req, res){
    try {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    const session = await db.collection("sessions").findOne({token});
    if(!session){
        return res.status(404).send("token não existe!");
    };
    res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao tentar buscar os produtos");
    }

}