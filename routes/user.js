const express=require("express");
const userController=require("../controllers/user");
const {body}=require("express-validator");
const User=require("../models/user");
const router=express.Router();

//for signing up the user
//adding validation for the user using express-validator package
router.post("/signup",[
   body ("email")
   .isEmail()
   .normalizeEmail()
   .custom(async(value ,{req})=> {
const user=await User.findOne({email:value});
if(user){
    return Promise.reject("Email already exists");
}

   }),
   body("password")
   .trim()
   .isLength({min:5})
   .custom((value, { req }) => {
   
    if (value === req.body.email) {
        throw new Error("Password cannot be the same as email");
    }
    return true;
}),
body("name")
.trim()
.isLength({min:3})
.isAlpha()
] , userController.signup);
//For login the user
router.post("/login" , userController.login);
module.exports=router;
