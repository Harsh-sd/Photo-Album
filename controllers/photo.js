
const Photo=require("../models/photo");
const path=require("path");

exports.getPhoto=async (req,res,next)=> {
    try {
        const allphoto=await Photo.find();
        res.status(200).send({message:"photos fetched successfully" , photo:allphoto});
    } catch (error) {
        res.status(500).send({message:"Internal server error" });
        console.log(error);
    }
}
exports.addPhoto= async (req,res,next)=> {
    try {
        const title=req.body.title;
const description=req.body.description;
const location=req.file;
const tags=req.body.tags;
if(!req.file){
return res.status(422).send({message:"Image is not found"});
}

const photo=new Photo({
     title: title,
     description: description,
     location:req.file.path,
     tags: tags
});
const savedPhoto=await photo.save();
res.status(201).send({message:"photo added successfully"  , photo:savedPhoto}  );

    } catch (error) {
        res.status(500).send({message:"Internal server error" });
        console.log(error);
    }

};
exports.editPhoto=async(req,res,next)=> {
    try {
        const title=req.body.title;
const description=req.body.description;
const location=req.file;
const tags=req.body.tags;
const photoId=req.params.photoId;
const existPhoto=await Photo.findById(photoId);
if(!req.file){
    return res.status(422).send({message:"Image is not found"});
}
if(!existPhoto){
    res.status(422).send({message :"Photo does not found"})
}
existPhoto.title=title;
existPhoto.description =description;
existPhoto.location=req.file.path;
existPhoto.tags=tags;

const savedPhoto=await existPhoto.save();
res.status(201).send({message:"photo edited successfully"  , photo:savedPhoto}  );
        
    } catch (error) {
        res.status(500).send({message:"Internal server error" });
        console.log(error);
    }
};

exports.deletePhoto= async(req,res,next)=> {
    try {
        const photoId=req.params.photoId;
const existPhoto=await Photo.findByIdAndDelete(photoId);
if(!existPhoto){
    res.status(422).send({message :"Photo does not found"})
}
res.status(200).send({message:"photo delted successfully"  , photo:existPhoto})
    } catch (error) {
        res.status(500).send({message:"Internal server error" });
        console.log(error);
    }
}