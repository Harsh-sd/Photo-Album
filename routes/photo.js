const express=require("express");
const photoController=require("../controllers/photo");
const isAuth=require("../middleware/isAuth");

const router=express.Router();
//To get all the photos
router.get("/photo",isAuth , photoController.getPhoto);
//To add the photo localhost:3000/addPhoto
router.post("/addPhoto" ,isAuth , photoController.addPhoto);
//To edit the existing photo localhost:3000/editPhoto/:photoId
router.put("/editPhoto/:photoId" ,isAuth ,photoController.editPhoto );
//To delete the existing photo localhost:3000/deletePhoto/:photoId
router.delete("/deletePhoto/:photoId" ,isAuth ,photoController.deletePhoto );
module.exports=router;