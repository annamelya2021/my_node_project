
import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL


const fetchData = async(route,method,inputData=null)=>{
    
    const url = new URL(API_URL + route);
    const fetchOptions = {
        method:method,
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    }
    if(inputData){
        if(method === "get"){
            Object.keys(inputData).forEach(key=>{
                url.searchParams.append(key,inputData[key]);
            })
        }

        else if(method === "post" || method === "put" || method === "patch"){
            fetchOptions.body = JSON.stringify(inputData);
        }
    }
    try {
        const result = await fetch(url.toString(),fetchOptions);
        
        const data  = await result.json();
        // console.log("Fetch result:", data); 
        return data;
    } catch (error) {
        return ({error:error.message})
    }
}

const register = async(userData)=>{
    const result = await fetchData("/auth/register","post",userData);
    return result;
}
const login = async(userData)=>{
    const result = await fetchData("/auth/login","post",userData);
    return result;
}

  
const getPosts = async()=>{
    const result = await fetchData("/posts","get");
    return result;
}

const getPostById = async (postId) => {
    const result = await fetchData(`/posts/${postId}`, "get");
    return result;
  }
  
  const deletePost = async (postId) => {
    const result = await fetchData(`/posts/${postId}`, "delete");
    return result;
  }
const createPost = async(postData)=>{
    const result = await fetchData("/posts","post",postData);
    return result;
}

const getComments = async (postId) => {
    const result = await fetchData(`/posts/${postId}/comments`, "get");
    //console.log("result",result)
    return result;
  }
  
  const addComment = async (postId, commentData) => {
    const result = await fetchData(`/posts/${postId}/comments`, "post", commentData);
    return result;
  }


  const deleteComment = async (postId, commentId) => {
    const result = await fetchData(`/posts/${postId}/comments/${commentId}`, "delete");
    return result;
  }

  const addContact = async (contactData) => {
    const result = await fetchData("/contacts", "post", contactData);
    return result;
  }

  const getContact = async (contactData) => {
    const result = await fetchData("/contacts", "get");
    return result;
  }

  const deleteContact = async (contactId) => {
    const result = await fetchData(`/contacts/${contactId}`, "delete");
    return result;
  }

  const getUsers = async () => {
    const result = await fetchData("/user", "get");
    return result;
  };
  const deleteUser = async (userId) => {
    const result = await fetchData(`/user/${userId}`, "delete");
    return result;
  };

export {
    register,
    login,
    getPosts,
    createPost,
    getPostById,
    deletePost,
    getComments,
    addComment,
    deleteComment,
    addContact,
    getContact,
    deleteContact,
    getUsers,
    deleteUser
}
