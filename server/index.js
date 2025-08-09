const express=require("express");
const app=express();
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")
const userRoutes=require('./routes/userRoutes');
const hospitalRoutes=require('./routes/hospitalRoutes');
require('dotenv').config();
const mongouri = process.env.MONGO_URI;

app.use(express.json());


app.use('/user',userRoutes);
app.use('/hospital',hospitalRoutes)
mongoose.connect(mongouri).then(()=>{
    console.log('Mongo db coneected');
    app.listen(3000);
    console.log("Server started");

}).catch((err) => {
    console.log("failed to connect ot mongodb");
});

// app.listen(3000);