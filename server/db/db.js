const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const user=new Schema({
    username:{type :String,unique:true},
    name:String,
    password:String,
    address: String,
    // location:String,
    DOB:Date,
    bloodGroup:String,
    email:String,
    phone:String,
    donateCount:{type:Number,default:0}
})

const hospital=new Schema({
    hospitalUsername:{type:String,unique:true},
    password:String,
    hospitalName:String,
    address:String,
    phone:String,
    email:String,

})
const bloodManagement=new Schema({
    hospitalUsername:{type:String,unique:true},
    Aplus:{type:Number,default:0},
    Aminus:{type:Number,default:0},
    Bplus:{type:Number,default:0},
    Oplus:{type:Number,default:0},
    Ominus:{type:Number,default:0},
    Bminus:{type:Number,default:0},
    ABplus:{type:Number,default:0},
    ABminus:{type:Number,default:0},
    
})

const hospitalsDonors=new Schema({
    hospitalUsername:{type:String,unique:true},
    donors:[String]
})

const Hospital=mongoose.model("hospital",hospital);
const BloodManagement=mongoose.model("bloodManagement",bloodManagement);
const HospitalsDonors=mongoose.model("hospitalsDonors",hospitalsDonors);
const UserModel=mongoose.model("user",user);

module.exports={
    UserModel,HospitalsDonors,Hospital,BloodManagement
}