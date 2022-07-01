import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () =>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mogodb disconnected");
});

// mongoose.connection.on("connected", () => {
//     console.log("mogodb connected");
// });
//    This code is only for explaining api concept
// app.get("/users", (req, res) => {
//     res.send("hello first request !");
// });

// Middlewares

// This is only to know what a middleware do

// app.use((req,res,next)=>{
// res.send("hello middleware")
// next() //next for go to the next middleware
// }) 
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


// if any error occurs in any route (api request) we are able to handle it with this middleware  
app.use((err,req,res,next)=>{
const errorStatus = err.status || 500
const errorMessage = err.message || "Something went wrong!"

return res.status(errorStatus).json({
    success:false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack

});

})



app.listen(8800, ()=>{
    connect();
    console.log("Connected to backend.");
});