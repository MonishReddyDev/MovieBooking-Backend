import express from "express";
import movieRoutes from "./routes/movieRouter";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import showTimeRoutes from "./routes/showTimesRouter";
import theaterRoutes from "./routes/theaterRouter";
import logger from "./utils/logger";
import screenRoutes from "./routes/screenRoutes";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/api/v1", movieRoutes);
app.use("/api/v1", showTimeRoutes);
app.use("/api/v1", theaterRoutes);
app.use("/api/v1", screenRoutes);

//DDos protection and rate limiting

// IP-based rate limiting for sensitive endpoints

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port", port);
});

process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
