const express=require("express");
const app=express();
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")
const userRoutes=require('./routes/userRoutes');
const hospitalRoutes=require('./routes/hospitalRoutes');
require('dotenv').config();
const mongouri = process.env.MONGO_URI;
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.get('/test', (req, res)=>{
    res.json('sayan')
});

app.use('/user',userRoutes);
app.use('/hospital',hospitalRoutes)
console.log("API KEY FROM ENV:", process.env.SENDGRID_API_KEY);
mongoose.connect(mongouri).then(()=>{
    console.log('Mongo db coneected');
    app.listen(3000);
    console.log("Server started");

}).catch((err) => {
    console.log("failed to connect ot mongodb");
});

// app.listen(3000);