
const Album=require("../models/album");

const Photo=require("../models/photo");
// localhost:3000/album/?page=1
exports.getAlbum=async(req,res,next)=> {
  try {
    const page=req.query.page ||1;
    const perpage=5;
    let totalItems;
    totalItems=await Album.countDocuments();
    const allAlbum=await Album.find().skip((page-1)*perpage).limit(perpage);
    res.status(200).send({message:"All Albums fetched successfully" , album:allAlbum,totalPages: totalItems,
    currentPage: page})
  } catch (error) {
    res.status(500).send({message:"Internal Server error"});
    console.log(error);
  }
}
exports.addAlbum=async (req,res,next)=> {
try {
    const title=req.body.title;
    const description=req.body.description;
    
    const createdBy=req.user._id;
    const album=new Album({
        title:title,
        description:description,
        
        createdBy:createdBy
    })
    const savedAlbum=await album.save();
    res.status(201).send({message :"Album formed successfully" , album:savedAlbum})
    
} catch (error) {
    res.status(500).send({message:"Internal Server error"});
    console.log(error);
}
};
exports.editAlbum=async (req,res,next)=> {
    try {
        const title=req.body.title;
        const description=req.body.description;
       
        const albumId=req.params.albumId;
        
        const userId=req.user._id;
        const existAlbum=await Album.findById(albumId);
         //If the userId are not same
        if (String(existAlbum.createdBy) !== String(userId)) {
            return res.status(403).send({ message: "You are not authorized to edit this album" });
        }
                existAlbum.title=title;
                existAlbum.description=description;
               
                existAlbum.createdBy=userId
                const savedAlbum=await existAlbum.save();
                res.status(201).send({message:"album edited successfully" , album:savedAlbum});
    } catch (error) {
        res.status(500).send({message:"Internal Server error"});
    console.log(error);
    }
};
exports.deleteAlbum=async(req,res,next)=> {
    try {
        const albumId=req.params.albumId;
        const userId=req.user._id;
        const existAlbum=await Album.findByIdAndDelete(albumId);
        //If the userId are not same
        if (String(existAlbum.createdBy) !== String(userId)) {
            return res.status(403).send({ message: "You are not authorized to delete this album" });
        }
        res.status(200).send({message:"Album deletes successfully" , album:existAlbum})
    } catch (error) {
        res.status(500).send({message:"Internal Server error"});
    console.log(error);
    }
};
exports.addPhotoToAlbum=async(req,res,next)=> {
try{
const albumId=req.params.albumId;
// find the album by its Id
const album=await Album.findById(albumId);

if(!album){
    return res.status(422).send({message:"Album not found"})
};
  // Create new photo objects

const photosData = req.body.photos;
const newPhotos = await Promise.all(photosData.map(async photoData => {
    const newPhoto = new Photo({
        title: photoData.title,
        description: photoData.description,
        
        tags: photoData.tags
    });
    return await newPhoto.save();
}));
        // Add IDs of new photos to album's photos array
        album.photos.push(...newPhotos.map(photo => photo._id));

        // Save the album with updated photos array
        await album.save();

        res.status(201).json({ message: 'Photos added to album successfully', album: album })
 } catch (error) {
        console.error('Error adding photos to album:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};
exports.addCoverphotoToAlbum=async(req,res,next)=> {
    try {
        const albumId=req.params.albumId;
// find the album by its Id
const album=await Album.findById(albumId);

if(!album){
    return res.status(422).send({message:"Album not found"})
};
  // Extract cover photo data from the request body
  const coverPhotoData = req.body.photo;

  // Validate the presence of cover photo data
  if (!coverPhotoData) {
      return res.status(400).json({ message: "Cover photo data is required" });
  }

  const newPhoto = new Photo({
    title: coverPhotoData.title,
    description: coverPhotoData.description,
    
    tags: coverPhotoData.tags
});

// Save the cover photo
const savedPhoto = await newPhoto.save();

// Set the cover photo ID in the album's coverPhoto field
album.coverPhoto = savedPhoto._id;

        // Add IDs of new photos to album's photos array
        

        // Save the album with updated photos array
        await album.save();

        res.status(201).json({ message: 'coverPhoto added to album successfully', album: album })

    } catch (error) {
        console.error('Error adding photos to album:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//exports.addCoverPhotoToAlbum = async (req, res, next) => {
    //   try {
   //  const albumId = req.params.albumId;
    //     const photoId = req.body.photoId; // Assuming the client provides the ID of the photo to set as cover photo

        // Find the album by its ID
    //     const album = await Album.findById(albumId);

     //    if (!album) {
     //        return res.status(422).send({ message: "Album not found" });
     //    }

        // Set the cover photo ID in the album's coverPhoto field
     //    album.coverPhoto = photoId;

        // Save the album with updated cover photo
    //     await album.save();

   //      res.status(200).json({ message: 'Cover photo added to album successfully', album: album });
   //  } catch (error) {
    //     console.error('Error adding cover photo to album:', error);
    //     res.status(500).json({ message: 'Internal server error' });
  //   }
// };