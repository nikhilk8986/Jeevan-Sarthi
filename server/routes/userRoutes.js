const express = require("express");
const router=express.Router();

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const JWT_SECRET="sayan_manna";
const { UserModel}=require("../db/db");
router.use(express.json());

function auth(req,res,next){
    const token=req.headers.token;
    const decodeData=jwt.verify(token,JWT_SECRET);

    if(decodeData.username){
        req.username=decodeData.username;
        next();
    }
    else {
        res.status(500).json({
            message:"you are not logged in"
        })
    }
}

router.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name = req.body.name;
    const confirmPassword=req.body.confirmPassword;
    const latitude = req.headers.latitude;
    const longitude = req.headers.longitude;
    if(password!=confirmPassword){
        res.status(500).json({
            message:"Incorect Password Match"
        });
            
    }
    else{
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({
                username,name, password: hashedPassword, location:{latitude: latitude, longitude: longitude}
            });
           
            res.status(200).json({
                message:"YOU ARE SIGNED UP"
            })
        }
        catch{
            
            console.log("failed to create ID 2");
            res.status(500).json({message: "Failed to create ID."});
        }
    }
})

router.post('/signin',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const latitude = req.headers.latitude;
    const longitude = req.headers.longitude;
    const user=await UserModel.findOne({username});
    if(!user){
        res.status(500).json({message: "Invalid Username!"});
    }
    const actualPassword=user.password;
    const isPasswordValid = await bcrypt.compare(password, actualPassword);
    if(!isPasswordValid){
        res.status(500).json({
            message:"Incorrect Password!"
        });
        return;
    }
    else{
        try {
            await UserModel.updateOne(
                {username: username},
                {$set:{location:{latitude:latitude, longitude:longitude}}}
            );
        } catch (error) {
            console.log("Failed to update location:", error);
        }
        
        const token=jwt.sign({
            username,
        },JWT_SECRET);

        res.status(200).json({
            token:token,
            message: "you are signed in!"
        })
    }
    
})

router.get('/me',async (req,res)=>{
    const token=req.headers.token;
    const decodeData=jwt.verify(token,JWT_SECRET);
    const username=decodeData.username;
    const user= await UserModel.findOne({username});
    //users location to be updated

    if(user){
        res.json({name: user.name});
        // console.log(user);
    }
})

router.get('/getrequest',auth,async(req,res)=>{
    
})

router.post('/fillData',auth,async(req,res)=>{
    const address=req.body.address;
    const DOB=req.body.DOB;
    const bloodGroup=req.body.bloodGroup;
    const email=req.body.email;
    const phone=req.body.phone;
    const username=req.username;
    const sex=req.body.sex;
    const user=await UserModel.findOne({username});

    if(!user){
        res.status(500).json({
            message:"Something went wrong"
        })
    }else{
        await UserModel.updateOne(
            {username:username},
            {$set:{address:address,DOB:DOB,
                bloodGroup:bloodGroup,
                email:email,
                phone:phone,
                sex:sex
            }},
         { upsert: true }
        )
    }
    res.status(200).json({
        message:"data updated "
    })

})

module.exports=router;