import express from "express";
import dotenv from "dotenv";


// import mongoose from "mongoose";
// import createPath from "./helpers/create-path.js";

import connectDB from "./config/mongo.js"; // importamos la base de datos

dotenv.config();
const CONTAINER_PORT = 3000;


const app = express();
// app.use(session(sessionData));
// app.use(function(req,res,next){
//     res.locals.session = req.session;
//     next();
// })
connectDB();
app.use(express.static("public")); 

app.set("views","./src/views");
app.set("view engine","pug");

app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

app.get("/",(req,res)=>{
    res.json({message:"Hello World"});
})

// app.get("/", (req, res) => {
//     res.render("index", { title: 'Home' });
// });



app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+process.env.APP_PORT);
})
