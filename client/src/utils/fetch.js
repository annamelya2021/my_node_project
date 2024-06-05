
import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL


const fetchData = async(route,method,inputData=null)=>{
    
    const url = new URL(API_URL + route);
    console.log(url)
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
        console.log(fetchOptions)
        const result = await fetch(url.toString(),fetchOptions);
        const data  = await result.json();
        return data;
    } catch (error) {
        // console.error(error);
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
const createPost = async(postData)=>{
    const result = await fetchData("/posts","post",postData);
    return result;
}

export {
    register,
    login,
    getPosts,
    createPost
}
