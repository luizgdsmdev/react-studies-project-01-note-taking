import "dotenv/config";
import express from "express";
import NOTES_ROUTER from "./routes/NOTES_ROUTER.js";
import connectDB from "./config/mongoDB.js";

const app = express(); // Create express app
app.use(NOTES_ROUTER); // Use note router for endpoints access

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port " + process.env.APP_PORT);
});
