const mongoose=require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//for connecting the database to the web application for the purpose of storing the information
async function connectToMongoose () {
    try {
       await mongoose.connect(process.env.DATABASELINK);
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting in database" , error);
    }

};
module.exports=connectToMongoose;