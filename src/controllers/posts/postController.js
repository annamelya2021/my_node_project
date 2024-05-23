import postModel from "../../models/postModel.js";
// import userController from "../users/userController.js";

import userController from "../users/userController.js";

const getAll = async(userId=null)=> {
    try {
        if(!userId){
            const posts = await postModel.find();
            return posts;
        }
        const user =await userController.getById(userId);
        await user.populate("posts");
        return user.posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const post = await postModel.findById(id);
        if(!post){
            return null;
        }
        return post;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const post = await postModel.create(data);
        post.users.push(data.owner);
        await post.save();
        await userController.addPost(data.owner,post._id);
        return post;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        await postModel.findByIdAndUpdate(id,data);

        const post = await postModel.findById(id);
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const post = await postModel.findByIdAndDelete(id);
        // const result = await postController.removeForProject(id);
        await userController.removeProject(post.owner,id)
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async(postId,userId) =>{
    try {
        // console.log("user",userId)
        const post = await getById(postId);
 
        await userController.addProject(userId,postId)
        if(!post.users.includes(userId)){
            post.users.push(userId);
            await post.save();
            return post
        }
        return post;
    } catch (error) {
        return null;
    }
}
const removeUser = async(postId,userId)=>{
    try {
        console.log("removeUser",postId,userId)
        const project = await getById(postId);
        if(userId.equals(post.owner)){
            return {error:"El owner no se puede borrar"};
        }
        await userController.removeProject(userId,postId);
        if(post.users.includes(userId)){
            post.users = post.users.filter(u=> !u.equals(userId));
            await post.save();
            return post
        }
        return post;
    } catch (error) {
        return null;
    }
}


export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
}

export default functions;