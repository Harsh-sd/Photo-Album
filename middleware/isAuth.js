const jwt=require("jsonwebtoken");
const decodeToken=(req,res,next)=> {
    const token=req.headers.authorization;
if(!token){
    res.status(422).send({message:"token does not found"});
}
try {
    const decodetoken=jwt.verify(token , "generatetoken" );

    req.id=decodetoken.userId;
    next();

} catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).send({ message: "Invalid token" });
}
};
module.exports=decodeToken;