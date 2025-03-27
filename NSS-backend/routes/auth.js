import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/User.js";


const router=express.Router();

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=users.find(u=> u.email===email);
        if(!user){
            return res.status(403).json({message:"Access denied"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(403).json({message:"invalid credentials"});

        }
        const token=jwt.sign({email:user.email},'your_jwt_secret',{expiresIn:'1h'});
        res.json({token,message:"Login successful"});

    }catch(err){
        res.status(500).json({message:"ServerError"});
    }
});

export default router;