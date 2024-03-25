const mongoose=require("mongoose");
const express=require("express");
const albumController=require("../controllers/album");
const isAuth=require("../middleware/isAuth");
const router=express.Router();
//TO get all the albums
router.get("/album" ,isAuth , albumController.getAlbum);
//for creating the new album
router.post("/addAlbum" ,isAuth , albumController.addAlbum );
//To edit the existing Album
router.put("/editAlbum/:albumId" ,isAuth , albumController.editAlbum );
//To delete the exising album
router.delete("/deleteAlbum/:albumId" ,isAuth , albumController.deleteAlbum );
//to add photo to specific album
router.post("/album/:albumId/photos" , isAuth , albumController.addPhotoToAlbum);
//To add coverphoto to album
router.post("/album/:albumId/coverphoto" , isAuth , albumController.addCoverphotoToAlbum);
module.exports=router;