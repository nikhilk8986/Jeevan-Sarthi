const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const user=new Schema({
    username:{type :String,unique:true},
    name:String,
    password:String
})

const UserModel=mongoose.model("user",user);

module.exports={
    UserModel
}