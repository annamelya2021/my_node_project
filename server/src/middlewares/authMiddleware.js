import jwt from "jsonwebtoken";
import userController  from "../controllers/users/userController.js";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_TOKEN_KEY } = process.env;


const isAuthenticated = async(req,res,next)=>{
  // //console.log("Llego aqui")
    const authorization  =req.headers.authorization;
  
    if(!authorization){
        return res.status(401).json({error:"doesn't have a token jwt"});
    }
    try {
        const token = authorization.split("Bearer ")[1];
  
        const decoded =jwt.verify(token, SECRET_TOKEN_KEY);
        const user = await userController.getById(decoded._id);
    // //console.log("user", user) 
    
        if(!user){
            return res.status(400).json({error:"User does not existe"});
        }
        req.user = user;
        // //console.log("EL USER EN MIDDLEWARE ES",user)
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"An error ocurred"});
    }

}




export default isAuthenticated;



// const isAdmin = async(req,res,next)=>{
//     const authorization  =req.headers.authorization;
//     if(!authorization){
//         return res.status(401).json({error:"doesn't have a token jwt"});
//     }
//     try {
//         const token = authorization.split("Bearer ")[1];
//         const decoded =jwt.verify(token,process.env.JWT_SECRET);
//         const user = await userController.getById(decoded._id);
//         if(!user){
//             return res.status(400).json({error:"user does not exist"});
//         }
//         if(user.role !== "admin"){
//             return res.status(401).json({error:"does have a permissions as admin"});
//         }
//         req.user = user;
//         next();
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({error:"An error ocurred"});
//     }

// }


const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Token JWT is missing" });
    }
  
    try {
      const token = authorization.split("Bearer ")[1];
      const decoded = jwt.verify(token, SECRET_TOKEN_KEY);
      const user = await userController.getById(decoded._id);
  
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
  
      if (user.role !== "admin") {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }
  
  export { isAuthenticated, isAdmin };

