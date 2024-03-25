
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{validationResult}=require("express-validator");
exports.signup=async(req,res,next)=> {
    try {
      const errors=validationResult(req);
      
      if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
      }
        const email=req.body.email;
  const password=req.body.password;
  const name=req.body.name;
  const hashpassword=await bcrypt.hash(password ,12);
  const existUser=await User.findOne({email});
  if(existUser){
res.status(409).send("User already exist");
  }
  const user=new User({
    email:email,
    password:hashpassword,
    name:name
  });
  const savedUser=await user.save();
  res.status(201).send({message:"user signup efficiently" , user :savedUser})
    } catch (error) {
       // res.status(500).send({message:"Internal server error" });
       // console.log(error);
        
         // Handle errors
         if(!error.statuscode){
          error.statuscode=500;
         }
         next(error); // Pass the error to the global error handler
    }
  
};
exports.login=async(req,res,next)=> {
    try {
        const email=req.body.email;
  const password=req.body.password;
  const user=await User.findOne({email});
  if(!user){
    res.status(422).send({message:"user does not found"});
  }
  const comparepassword=await bcrypt.compare(password , user.password);
  if(!comparepassword){
    res.status(422).send({message:"password does not matched"});

  }
  const token= jwt.sign( {email:user.email , userId:user._id} , "generatetoken" ,{ expiresIn: "1y" });
  res.status(200).send({message:"user login successfully" ,token:token});
    } catch (error) {
        res.status(500).send({message:"Internal server error" });
        console.log(error);
    }
};