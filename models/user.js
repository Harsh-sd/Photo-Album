const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timeStamps:true});
module.exports=mongoose.model("user" , userSchema);
