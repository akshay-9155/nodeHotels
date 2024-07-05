const mongoose = require('mongoose');
require('dotenv').config();
// Define the mongodb connection URL

// const mongoURL = 'mongodb://localhost:27017/hotels';         // commented out because it is now fetched from dotenv file


// Code written below with the object { useNewUrlParser: true, useUnifiedTopology: true} is deprecated ---- 

// mongoose.connect(mongoURL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("Connected to mongoDB server");
})

db.on("error",(err)=>{
    console.log("MongoDB connection error" + err);
})

db.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})


module.exports = db;





// {
//     useNewUrlParser: true,
//         useUnifiedTopology: true
// }