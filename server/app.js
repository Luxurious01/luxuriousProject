const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

//my database link
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => {
    console.log("connection done");
}).catch((err) => {
    console.log("connection not setup");
});
//middleware

const middleware = (req , res , next)=>{
    console.log("my middleware");
    next();
}

//home page code here
app.get("/",(req , res) =>{
    res.send("hello user");
});

//cart code here
app.get("/cart",(req , res) =>{
    res.send("hey its your cart value");
});

//wishlist code here
app.get("/wishlist",middleware ,(req , res) =>{
    res.send("hey this is wishlist");
});

//Login code here
app.get("/login",(req , res) =>{
    res.send("hey this is login here");
});

//Signup code here
app.get("/signup",(req , res) =>{
    res.send("hey this is register herecls");
});

//console output
app.listen(PORT , ()=>{
    console.log("server running "+PORT);
});