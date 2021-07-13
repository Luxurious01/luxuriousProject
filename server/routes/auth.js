const { request, json } = require("express");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

require("../db/conn");

const User = require("../model/userSchema");


//home page code here
router.get("/",(req , res) =>{
    res.send("hello user auth.js");
});


//registration page code here
router.post("/register",async (req,res) => {

    //create variables for feilds
    const {firstName,lastName,email,password} = req.body

    //check empty credentials
    if(!firstName || !email || !password){
        res.status(422).json({error: "please fill all the field"})
    }

    try{

        const userExist = await User.findOne({email:email})     //check if user exist
        
        if(userExist){
            return res.status(422).json({error:"user already exists with that email"})
        }
        else{
            const user = new User({firstName,lastName,email,password});     //create current user

            await user.save();

            res.status(201).json({message:"user registerd successfully"});

        }

    }catch(err){
        console.log(err);
    }


});


//login page code here
router.post("/login",async (req,res) => {

    try{

        const {email,password} = req.body;

        //check empty feilds
        if(!email || !password){
            res.status(422).json({error: "please fill all the field"})
        }

        const userLogin = await User.findOne({email:email});        //my current user

        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);      //authencticating password

            if(!isMatch){

                res.json({message:"please check your credentials pass"});

            }else{
                
                res.json({message:"successfully logged in"});

            }

        }else{
            res.json({message:"please check your credentials"});
        }


    }catch(err){
        console.log(err);
    }

});

module.exports = router;
