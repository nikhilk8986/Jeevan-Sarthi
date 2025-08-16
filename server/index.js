const express=require("express");
const app=express();
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")
const userRoutes=require('./routes/userRoutes');
const hospitalRoutes=require('./routes/hospitalRoutes');
require('dotenv').config();
const cors = require("cors");

// Environment variables with fallbacks
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors({ 
  origin: FRONTEND_URL, 
  credentials: true 
}));

app.get('/test', (req, res)=>{
    res.json('sayan')
});

app.use('/user',userRoutes);
app.use('/hospital',hospitalRoutes);

mongoose.connect(MONGO_URI).then(()=>{
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        console.log(`Frontend URL: ${FRONTEND_URL}`);
    });
}).catch((err) => {
    console.log("Failed to connect to MongoDB:", err.message);
});