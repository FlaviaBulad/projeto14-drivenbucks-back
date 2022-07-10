import { db } from "../database/mongodb.js";

export async function getProducts(req, res){
    const {authorization} = req.headers;
    const userToken = authorization?.replace("Bearer ", "");
   
    try {
    const session = await db.collection("sessions").find({}).toArray();
       
    if(!session){
        return res.status(404).send("token não existe!");
    };
    
    const products = await db.collection("products").find({}).toArray();
   
    res.status(200).send(products);
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao tentar buscar os produtos");
    };

};