import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./api/routes/auth";
dotenv.config()

const app = express();
const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to database!");
} catch (error) {
    throw error;
}
};

mongoose.connection.on("Disconnected", () => {
    console.log("MongoDB disconnected!");
})
mongoose.connection.on("Connected", () => {
    console.log("MongoDB connected!");
})

app.get("/users", (req, res) => {
    res.send("Hello first!");
} )

//Middleware
app.use("/api/auth", router);
app.listen(8800, () => {
    console.log("Connected sucessfull !");
    
});