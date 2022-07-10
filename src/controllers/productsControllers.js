import { db } from "../database/mongodb.js";

async function getProducts(req, res){
    try {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    const session = await db.collection("sessions").findOne({token});
    if(!session){
        return res.status(404).send("token não existe!");
    };

    } catch (error) {
        
    }

}