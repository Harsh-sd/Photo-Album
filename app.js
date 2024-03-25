const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const photoRoutes = require("./routes/photo");
const albumRoutes = require("./routes/album");
const userRoutes = require("./routes/user");
const formidable = require('formidable');
const path = require("path");

const connectToMongoose = require("./db");
const dotenv = require("dotenv");

connectToMongoose();
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());




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
