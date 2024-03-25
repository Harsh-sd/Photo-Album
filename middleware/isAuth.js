const jwt=require("jsonwebtoken");
const decodeToken=(req,res,next)=> {
    const token=req.headers.authorization;
if(!token){
    res.status(422).send({message:"token does not found"});
}
try {
    const decode=jwt.verify(token , "generatetoken" );

    req.user=decode;
    next();

} catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).send({ message: "Invalid token" });
}
};
module.exports=decodeToken;