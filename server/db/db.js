const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const user=new Schema({
    username:{type :String,unique:true},
    name:String,
    password:String,
    address: String,
    DOB:Date,
    sex:String,
    bloodGroup:String,
    email:String,
    phone:String,
    donateCount:{type:Number,default:0},
    location:{latitude:String, longitude:String},
    lastDonated:Date
})

const userAppointments = new Schema({
  username: { type: String, unique: true, required: true },
  appointments: [
    {
      hospitalName: { type: String, required: true },
      bloodGroup: { type: String, required: true },
      location: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
      }
    }
  ]
});

const hospital=new Schema({
    hospitalUsername:{type:String,unique:true},
    password:String,
    hospitalName:String,
    address:String,
    phone:String,
    email:String,
    location:{latitude:String, longitude:String}

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
    donors: [
        {
            id: { type: String, required: true },
            volume: { type: Number, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true }
        }
    ]
})

const requests=new Schema({
    hospitalUsername:{type:String, unique:true},
    bloodGroup:[String],
    location:{latitude:String, longitude:String}

})

const Hospital=mongoose.model("hospital",hospital);
const BloodManagement=mongoose.model("bloodManagement",bloodManagement);
const HospitalsDonors=mongoose.model("hospitalsDonors",hospitalsDonors);
const UserModel=mongoose.model("user",user);
const RequestsModel = mongoose.model("requests", requests);
const UserAppointments = mongoose.model("userAppointments", userAppointments)

module.exports={
    UserModel,HospitalsDonors,Hospital,BloodManagement, RequestsModel, UserAppointments
}