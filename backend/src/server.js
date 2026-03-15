import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

// const express = require("express");

dotenv.config();



const app = express();
const PORT = process.env.PORT ;//|| 5001


// middleware
app.use(
  cors({
   origin: "http://localhost:5173",
  })
);
app.use(express.json());//will pass json body
app.use(ratelimiter);

app.use((req,res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
})

app.use("/api/notes", notesRoutes);
//app.use("/api/Products", ProductsRoutes);
//app.use("/api/Payments", PaymentsRoutes);


connectDB().then(() =>{
  app.listen(PORT, () => {
    console.log("Server started on Port:",PORT);
  });
});
