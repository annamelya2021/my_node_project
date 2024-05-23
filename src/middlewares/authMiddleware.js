import jwt from "jsonwebtoken";
import userController  from "../controllers/users/userController.js";
import userModel from '../models/userModel.js';
import dotenv from "dotenv";
dotenv.config();

const { SECRET_TOKEN_KEY } = process.env;


const isAuthenticated = async(req,res,next)=>{
    const authorization  =req.headers.authorization;
  
    if(!authorization){
        return res.status(401).json({error:"doesn't have a token jwt"});
    }
    try {
        const token = authorization.split("Bearer ")[1];
  
        const decoded =jwt.verify(token, SECRET_TOKEN_KEY);
        const user = await userController.getById(decoded._id);
    
    
        if(!user){
            return res.status(400).json({error:"User does not existe"});
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"An error ocurred"});
    }

}



// const isAuthenticated = async (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res.status(401).json({ error: "Token JWT is missing" });
//   }

//   try {
//     const token = authorization.split("Bearer ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // const user = await userModel.findById(decoded._id);
//     const user = await userModel.findOne(decoded._id);
//     console.log(decoded)
    

//     if (!user) {
//       return res.status(400).json({ error: "User does not exist" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "An error occurred" });
//   }
// }

export default isAuthenticated;



const isAdmin = async(req,res,next)=>{
    const authorization  =req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"no hay token jwt"});
    }
    try {
        const token = authorization.split("Bearer ")[1];
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        const user = await userController.getById(decoded._id);
        if(!user){
            return res.status(400).json({error:"No existe el usurio"});
        }
        if(user.role !== "admin"){
            return res.status(401).json({error:"No estás autorizado"});
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"ha habido un error"});
    }

}

export {
    isAuthenticated,
    isAdmin
}