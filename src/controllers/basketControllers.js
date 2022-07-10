import { db } from "../database/mongodb.js";

export async function addToBasket(req, res){
  
   
    
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao tentar colocar o produto no carrinho");
    };

};
