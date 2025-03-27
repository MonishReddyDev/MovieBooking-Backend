console.time("App Startup Time");
import dotenv from "dotenv";
dotenv.config();
import movieRoutes from "./routes/movieRouter";
import express from "express";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import showTimeRoutes from "./routes/showTimesRouter";
import theaterRoutes from "./routes/theaterRouter";
import logger from "./utils/logger";
import screenRoutes from "./routes/screenRoutes";
import helmet from "helmet";
import cors from "cors";
import rateLimiterMiddleware from "./middlewares/rateLimitMiddleware";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello, this is your MovieService response!");
});

//DDos protection and rate limiting
app.use(rateLimiterMiddleware);

//Routes
app.use("/api/v1", movieRoutes);
app.use("/api/v1", showTimeRoutes);
app.use("/api/v1", theaterRoutes);
app.use("/api/v1", screenRoutes);

//Global Errr handling
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.timeEnd("App Startup Time");
  logger.info(`Movie service running on port ${PORT}`);
});

process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
