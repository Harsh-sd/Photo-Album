const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const albumSchema=new Schema ({
    title:{
        type:String
    },
    description:{
        type:String
    },
    photos:[{
type:Schema.Types.ObjectId,
ref:"photo"
    }],
    coverPhoto: {
        type: Schema.Types.ObjectId,
        ref: "Photo" // Reference to the photo model
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user" // Reference to the User model
    },
    
    createdAt:{
        type:Date , 
        default:Date.now
    }
},{timeStamps:true});
module.exports=mongoose.model("album" , albumSchema);