import "dotenv/config";
import express from "express";
import NOTES_ROUTER from "./routes/NOTES_ROUTER.js";
import connectDB from "./config/mongoDB.js";
import rateLimiting from "./middleware/rateLimiting/rateLimiting.js";
import cors from "cors";
/**
 * @description Start the server and mongoDB together to avoid race conditions or buffer issues.
 * It ensures that the database is connected before the server starts, since the server depends on it for user data.
 * @returns {void}
 */
const startServer = async () => {
  await connectDB().then(() => {
    const app = express();

    // Trust proxy when behind load balancer (required for req.ip to work correctly)
    app.set("trust proxy", true);

    app.use(express.json()); // Middleware to parse JSON bodies
    app.use(cors({ origin: process.env.ALLOWED_ORIGINS_FOR_CORS }));
    app.use(rateLimiting);
    app.use(NOTES_ROUTER);

    app.listen(process.env.APP_PORT || 5001, () => {
      console.log(
        "Server is running on port " + (process.env.APP_PORT || 5001),
      );
    });
  });
};

startServer();
