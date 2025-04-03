console.time("App Startup Time");
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/index";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import logger from "./utils/logger";
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
app.use("/api/", routes); // Mount all routes under `/api/v1`

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
