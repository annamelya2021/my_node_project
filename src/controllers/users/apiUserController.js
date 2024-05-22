import userModel from "../../models/userModel.js";
import userController from "./userController.js";
import {generateTokens} from "../../services/tokenService.js";
const getAll = async(req,res)=>{
    const users = await userController.getAll();
    res.json({data:users});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const user = await userController.getById(id);
    res.json({data:user});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const users = await userController.getByProperty(property,value);
    res.json({data:users})
}

const register = async(req,res)=>{
const { email, password, username } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
      res.status(409).json({ error: 'user is existed' });
      return
  }
  const result = await userModel.create({
    email,
    password,
    username,
  });

    res.status(200).json({data:result})
}

const login = async(req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'user is not existed' });
    }
    const token = await generateTokens({ _id: user._id, email: user.email});
    // const comparePassword = bcryptjs.compare(password, user.password);

    // if (!comparePassword) {
    // res.status(401).json({ error: 'password uncorrect' });
    // return
    // }
    res.json({token:token})
}
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
    res.json({data:user})
}

export default{
    getAll,
    getById,
    getByProperty,
    login,
    register,
    create,
    update,
    remove
}

