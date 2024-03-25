const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const photoSchema=new Schema ({
    title:{
         type:String,
         unique:true
    },
    description:{
        type:String
        
    },
    date:{
        type:Date,
        default:Date.now
      
    },
    location:{
        type:String
    },
    tags: [{
        type: String
    }]
    
    

},{timeStamps:true});
module.exports=mongoose.model("Photo" , photoSchema);