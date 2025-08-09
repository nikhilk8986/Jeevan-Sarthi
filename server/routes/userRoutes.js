const express = require("express");
const router=express.Router();

const jwt=require("jsonwebtoken")
const JWT_SECRET="sayan_manna";
const { UserModel}=require("../db/db");
router.use(express.json());


router.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name = req.body.name;
    const confirmPassword=req.body.confirmPassword;
    if(password!=confirmPassword){
        res.sendStatus(500).json({
            message:"Incorect Password Match"
        });
            
    }
    else{
        try {
            await UserModel.create({
                username,name, password
            });
            res.json({
                message:"YOU ARE SIGNED UP"
            })
        }
        catch{
            
            console.log("failed to create ID");
            res.json({message: "Failed to create ID."});
        }
    }
})

router.post('/signin',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    // const name = req.body.name;
    // const confirmPassword=req.body.confirmPassword;
    const user=await UserModel.findOne({username});
    if(!user){
        res.json({message: "Invalid Username!"});
    }
    const actualPassword=user.password;
    if(password!=actualPassword){
        res.sendStatus(500).json({
            message:"Incorrect Password!"
        });
            
    }
    else{
        const token=jwt.sign({
            username,
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    
})

router.get('/me',async (req,res)=>{
    const token=req.headers.token;
    const decodeData=jwt.verify(token,JWT_SECRET);
    const username=decodeData.username;
    const user= await UserModel.findOne({username});
    if(user){
        res.json({name: user.name});
        // console.log(user);
    }
})

module.exports=router;