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
    Aplus:Number,
    Aminus:Number,
    Bplus:Number,
    Oplus:Number,
    Ominus:Number,
    Bminus:Number,
    ABplus:Number,
    ABminus:Number,
    
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