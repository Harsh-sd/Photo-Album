const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const photoRoutes = require("./routes/photo");
const albumRoutes = require("./routes/album");
const userRoutes = require("./routes/user");

const multer  = require('multer');
const path = require("path");

const connectToMongoose = require("./db");
const dotenv = require("dotenv");

connectToMongoose();
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());


const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null ,"images");
    },
    
  });
  const fileFilters=(req,file,cb)=> {
    if(file.mimetype==="image/png" ||
    file.mimetype==="image/jpg" ||
    file.mimetype==="image/jpeg" )
    {
      cb(null , true)
    }
    else {
      cb(null , false)
    }
  }


app.use(multer({storage:fileStorage , fileFilter:fileFilters}).single('image'));

app.post('/upload', (req, res) => {
    // Handle uploaded file
    res.send('File uploaded successfully');
});

// Routes
app.use(photoRoutes);
app.use(albumRoutes);
app.use(userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error); // Log the error
   const statuscode= error.statuscode||500;
    res.status( statuscode).json({ message: 'Internal server error' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
