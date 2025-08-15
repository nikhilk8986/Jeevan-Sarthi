const express = require("express");
const router=express.Router();

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const JWT_SECRET = process.env.JWT_SECRET || "sayan_manna";
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 10;
const NEARBY_DISTANCE_KM = parseInt(process.env.NEARBY_DISTANCE_KM) || 10;
const {HospitalsDonors,Hospital,BloodManagement,UserModel, RequestsModel}=require("../db/db");

router.use(express.json());
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTestEmail(recipients) {
  for (const email of recipients) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || "sayan2003.dev@gmail.com",
      subject: `Blood Request Alert - ${process.env.SENDGRID_FROM_NAME || "Jeevan Sarthi"}`,
      text: `A hospital near you needs blood. Please check the Jeevan Sarthi app for details.`,
      html: `<strong>Blood Request Alert</strong><br><br>A hospital near you needs blood. Please check the Jeevan Sarthi app for details.`
    };

    try {
      await sgMail.send(msg);
      console.log(`✅ Sent to: ${email}`);
    } catch (err) {
      console.error(`❌ Error sending to ${email}:`, err.response?.body || err);
    }
  }
}


async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decodeData = jwt.verify(token, JWT_SECRET);

        if (!decodeData.hospitalUsername) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.hospitalUsername = decodeData.hospitalUsername;
        const hospital = await Hospital.findOne(
            { hospitalUsername: decodeData.hospitalUsername },
            { "location.latitude": 1, "location.longitude": 1, _id: 0 }
        );

        if (hospital?.location) {
            req.latitude = parseFloat(hospital.location.latitude);
            req.longitude = parseFloat(hospital.location.longitude);
        } else {
            req.latitude = null;
            req.longitude = null;
        }

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
}


router.post('/signup',async(req,res)=>{
    const hospitalUsername=req.body.hospitalUsername;
    const password=req.body.password;
    const hospitalName = req.body.hospitalName;
    const confirmPassword=req.body.confirmPassword;
    const latitude = req.headers.latitude;
    const longitude = req.headers.longitude;
    try{if(password!=confirmPassword){
        res.status(500).json({
            message:"Incorect Password Match"
        });
            
    }
    else{
        try {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
            await Hospital.create({
                hospitalUsername,hospitalName, password: hashedPassword,location:{latitude: latitude, longitude: longitude}
            });
            //hospital location to be updated
            res.status(200).json({
                message:"YOU ARE SIGNED UP"
            })
        }
        catch{
            
            console.log("failed to create ID");
            res.status(500).json({message: "Failed to create ID."});
        }
    }}
    catch{
        res.status(500).json({message: "Something went wrong during signup!"})
    }
})

router.post('/signin',async(req,res)=>{
    const hospitalUsername=req.body.hospitalUsername;
    const password=req.body.password;
    // const name = req.body.name;
    // const confirmPassword=req.body.confirmPassword;
    const latitude = req.headers.latitude;
    const longitude = req.headers.longitude;
    const hospitalUser=await Hospital.findOne({hospitalUsername});
    try{if(!hospitalUser){
        res.status(500).json({message: "Invalid hospital Username!"});
    }
    const actualPassword=hospitalUser.password;
    const isPasswordValid = await bcrypt.compare(password, actualPassword);
    if(!isPasswordValid){
        res.status(500).status(500).json({
            message:"Incorrect Password!"
        });
            
    }
    else{
        try{await Hospital.updateOne(
            {hospitalUsername:hospitalUsername},
            {$set:{location:{latitude:latitude, longitude:longitude}}}
        )}
        catch{
            console.log("failed to update location");
        }
        const token=jwt.sign({
            hospitalUsername,
        },JWT_SECRET);
        res.status(200).json({
            token:token
        })
    }}
    catch{
        res.status(500).json({
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
        res.status(200).json({hospitalName: hospitalUser.hospitalName});
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
        res.status(500).json({
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
    res.status(200).json({
        message:"data updated "
    })}
    catch{
        res.status(500).json({message: "Something went wrong during filling data!"})
    }

})

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth radius in km
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};
router.post("/request", auth, async (req, res) => {
  try {
    await RequestsModel.updateOne(
      { hospitalUsername: req.hospitalUsername },
      {
        $push: { bloodGroup: req.body.bloodGroup },
        $set: {
          location: {
            longitude: req.longitude, 
            latitude: req.latitude,
          },
        },
      },
      { upsert: true }
    );

    const allUsers = await UserModel.find({}, { username: 1, location: 1, _id: 0 });
    const nearbyUsernames = allUsers
      .filter((user) => {
        if (!user.location?.latitude || !user.location?.longitude) return false;

        const distance = haversineDistance(
          { latitude: req.latitude, longitude: req.longitude },
          { latitude: parseFloat(user.location.latitude), longitude: parseFloat(user.location.longitude) }
        );

        return distance <= NEARBY_DISTANCE_KM; // km
      })
      .map((user) => user.username); // now username = email

    if (nearbyUsernames.length > 0) {
      await sendTestEmail(nearbyUsernames); // directly send to usernames-as-emails
    }

    res.status(200).json({
      message: "Request added and emails sent",
      nearbyUsernames,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong in /request",
    });
  }
});

router.post('/donate', auth, async (req, res) => {
    const donorUsername = req.body.donorUsername;
    const volume = req.body.volume;
    const bloodGroup = req.body.bloodGroup;

    try {
        const donorUser = await UserModel.findOne({ username: donorUsername });
        if (!donorUser) {
            return res.status(404).json({ message: "Donor not found!" });
        }

        const { name, email } = donorUser;

        await UserModel.updateOne(
            { username: donorUsername },
            {
                $set: { lastDonated: new Date() },
                $inc: { donateCount: 1 }
            },
            { upsert: true }
        );

        await HospitalsDonors.updateOne(
            { hospitalUsername: req.hospitalUsername },
            { $push: { donors: { id: donorUsername, volume, name, email } } },
            { upsert: true }
        );

        const groupMap = {
            "A+": "Aplus",
            "A-": "Aminus",
            "B+": "Bplus",
            "B-": "Bminus",
            "O+": "Oplus",
            "O-": "Ominus",
            "AB+": "ABplus",
            "AB-": "ABminus"
        };

        if (!groupMap[bloodGroup]) {
            return res.status(400).json({ message: "Invalid blood group" });
        }

        await BloodManagement.updateOne(
            { hospitalUsername: req.hospitalUsername },
            { $inc: { [groupMap[bloodGroup]]: volume } },
            { upsert: true }
        );

        res.status(200).json({ message: "Donor details added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during donation" });
    }
});
router.get('/getDonors', auth,async (req, res)=>{
    try{
        const hospital = await HospitalsDonors.findOne({hospitalUsername:req.hospitalUsername});
        const donors = hospital.donors;
        res.status(200).json({donors:donors});
    }catch(err){
        res.status(500).json({message: err});
    }
})

router.get('/bloodLevels',auth,async(req,res)=>{
    const hospitalUsername=req.hospitalUsername;
    try{
        const hospital=await BloodManagement.findOne({hospitalUsername});
    res.status(200).json({
        Aplus:hospital.Aplus,
        Aminus:hospital.Aminus,
        Bplus:hospital.Bplus,
        Bminus:hospital.Bminus,
        Oplus:hospital.Oplus,
        Ominus:hospital.Ominus,
        ABplus:hospital.ABplus,
        ABminus:hospital.ABminus,
    })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"hospital not found"
        })
    }
   
    
})

router.post('/bloodUpdate',auth,async (req,res)=>{
    const hospitalUsername=req.hospitalUsername;
    const updateArray=req.body.updateArray;
    try{
        await BloodManagement.updateOne(
            {hospitalUsername:hospitalUsername},
            {$inc:{
                Aplus:-updateArray[0],
                Aminus:-updateArray[1],
                Bplus:-updateArray[2],
                Oplus:-updateArray[3],
                Ominus:-updateArray[4],
                Bminus:-updateArray[5],
                ABplus:-updateArray[6],
                ABminus:-updateArray[7]
            }},
         { upsert: true }
        );
        res.status(200).json({
            message:"updated"
        })
    }catch(error){
        console.log(error);
        res.status(200).json({
            message:"coudnot update in bloodUpdate"
        })
    }
})
/*
eligibility endpoint to be seen later.
router.get('/checkEligibility',auth,async(req,res)=>{
    const donorUsername=req.body.donorUsername;
    const donor=await UserModel.findOne({donorUsername});
    if(!donor){
        res.json({message: "Donor not found"})
    }
    const lastDonated=donor.lastDonated;
    const currentDate=new Date();
    const timeDifference=currentDate-lastDonated;
    const hoursDifference=timeDifference/(1000*60*60);
    if(donor.sex == 'Male'){
        if(hoursDifference<2160){
            res.json({eligibility: "No"});
        }else{
            res.json({eligibility: "Yes"});
        }
    }else{
        if(hoursDifference<2880){
            res.json({eligibility: "No"});
        }else{
            res.json({eligibility: "Yes"});
        }
    }
    
})
    */
module.exports=router;
