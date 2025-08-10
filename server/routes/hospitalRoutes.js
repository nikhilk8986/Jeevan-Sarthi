const express = require("express");
const router=express.Router();

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const JWT_SECRET="sayan_manna";
const {HospitalsDonors,Hospital,BloodManagement,UserModel}=require("../db/db");

router.use(express.json());


function auth(req,res,next){
    const token=req.headers.token;
    const decodeData=jwt.verify(token,JWT_SECRET);

    if(decodeData.hospitalUsername){
        req.hospitalUsername=decodeData.hospitalUsername;
        next();
    }
    else {
        res.json({
            message:"you are not logged in"
        })
    }
}

router.post('/signup',async(req,res)=>{
    const hospitalUsername=req.body.hospitalUsername;
    const password=req.body.password;
    const hospitalName = req.body.hospitalName;
    const confirmPassword=req.body.confirmPassword;
    try{if(password!=confirmPassword){
        res.sendStatus(500).json({
            message:"Incorect Password Match"
        });
            
    }
    else{
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Hospital.create({
                hospitalUsername,hospitalName, password: hashedPassword
            });
            //hospital location to be updated
            res.json({
                message:"YOU ARE SIGNED UP"
            })
        }
        catch{
            
            console.log("failed to create ID");
            res.json({message: "Failed to create ID."});
        }
    }}
    catch{
        res.json({message: "Something went wrong during signup!"})
    }
})

router.post('/signin',async(req,res)=>{
    const hospitalUsername=req.body.hospitalUsername;
    const password=req.body.password;
    // const name = req.body.name;
    // const confirmPassword=req.body.confirmPassword;
    const hospitalUser=await Hospital.findOne({hospitalUsername});
    try{if(!hospitalUser){
        res.json({message: "Invalid hospital Username!"});
    }
    const actualPassword=hospitalUser.password;
    const isPasswordValid = await bcrypt.compare(password, actualPassword);
    //hospital location to be updated
    if(!isPasswordValid){
        res.sendStatus(500).json({
            message:"Incorrect Password!"
        });
            
    }
    else{
        const token=jwt.sign({
            hospitalUsername,
        },JWT_SECRET);
        res.json({
            token:token
        })
    }}
    catch{
        res.json({
            message: "Something wennt wrong during signin!"
        })
    }
    
})

router.get('/me',async (req,res)=>{
    const token=req.headers.token;
    const decodeData=jwt.verify(token,JWT_SECRET);
    const hospitalUsername=decodeData.hospitalUsername;
    const hospitalUser= await Hospital.findOne({hospitalUsername});
    if(hospitalUser){
        res.json({hospitalName: hospitalUser.hospitalName});
        // console.log(user);
    }
})


router.post('/fillData',auth,async(req,res)=>{
    const address=req.body.address;
    const email=req.body.email;
    const phone=req.body.phone;
    const hospitalUsername=req.hospitalUsername;

    try{const hospitalUser=await Hospital.findOne({hospitalUsername});

    if(!hospitalUser){
        res.json({
            message:"Something went wrong"
        })
    }else{
        await Hospital.updateOne(
            {hospitalUsername:hospitalUsername},
            {$set:{address:address,
                email:email,
                phone:phone
            }}
        )
    }
    res.json({
        message:"data updated "
    })}
    catch{
        res.json({message: "Something went wrong during filling data!"})
    }

})

router.post('/donate',auth,async(req,res)=>{
    const donorUsername=req.body.donorUsername;
    const volume=req.body.volume;
    const bloodGroup=req.body.bloodGroup;
    try{await UserModel.updateOne(
        {username:donorUsername},
        {$inc:{
            donateCount:1
        }},
         { upsert: true }
    )}
    catch{
        res.json({message: "Somethig went wrong during finding user!"})
    }
    try{await HospitalsDonors.updateOne(
        {hospitalUsername:req.hospitalUsername},
        {$push:{
            donors:donorUsername
        }},
         { upsert: true }
    )}
    catch{
        res.json({message: "Something went wronfg during finding hospital"})
    }
    try{await BloodManagement.updateOne(
        {hospitalUsername:req.hospitalUsername},
        {$inc:{
            [bloodGroup]:volume
        }},
         { upsert: true }
    )}
    catch{
        res.json({message: "Something went wrong during updating blood record"})
    }
    res.json({
        message:"donor details added"
    })
})
module.exports=router;
