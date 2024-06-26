import userModel from "../../models/userModel.js";
import userController from "./userController.js";
import {generateTokens, saveTokens, removeToken} from "../../services/tokenService.js";
import bcrypt from "bcryptjs";
import RequestError from "../../helpers/errors/requestError.js";
const getAll = async(req,res)=>{
        const users = await userController.getAll();
        res.status(500).json(users);
}

const getById = async (req,res) =>{
    const id = req.params.id
    const user = await userController.getById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

const register = async(req,res)=>{
const { email, password, username } = req.body;
const saltRounds = 10;
const hashPassword = await bcrypt.hash(password, saltRounds);
  const user = await userModel.findOne({ email });
 if(email.length === 0){
    // return res.json({error:"No se ha podido registrar el usuario"});
    throw RequestError(409, "Email is required");
 }
  if (user) {
    return res.status(409).json({error:"No se ha podido registrar el usuario"});
    //  throw RequestError(409, "User already exists");
  }
  const result = await userModel.create({
    email,
    password: hashPassword,
    username,
  });

    res.status(200).json({data:result})
}

const login = async(req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw RequestError(401, "User is not existed");
    }
    const token = await generateTokens({ _id: user._id, email: user.email});
    //console.log("token", token);
    const comparePassword = await bcrypt.compare(password, user.password);
    //console.log('comparePassword', comparePassword);

    if (!comparePassword) {

    throw RequestError(401, "Wrong password");
  
    }
    await saveTokens(user._id, token,);

    res.cookie("Token", token, {
      maxAge: 30 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });

    res.json({token:token, user:{ email:user.email, id:user._id, roles:user.role}});
}

const logout = async (req, res) => {
      const  response  = req.cookies;
   //console.log('response :>> ', response);

      const removedToken = removeToken(response.Token);
      res.clearCookie("Token");
      res.json({ message: "Logout success", removedToken });

  };
const create = async(req,res)=>{
    const user = await userController.create(req.body);
    res.json({data:user})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const user = await userController.update(id,req.body);
    res.json({data:user})
}


const remove = async(req,res)=>{
    const id= req.params.id;
    const user = await userController.remove(id);
    // res.json({data:user})
    res.status(200).json({ message: "User successfully deleted" });
}


export default {
    getAll,
    getById,
    login,
    register,
    create,
    update,
    remove,
    logout
}

