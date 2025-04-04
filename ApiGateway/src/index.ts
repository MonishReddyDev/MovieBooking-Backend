import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";
import rateLimiterMiddleware from "./middlewares/rateLimitMiddleware";
import morgan from "morgan";
import redisClient from "./config/redisClient";
import proxy from "express-http-proxy";
import { NextFunction } from "http-proxy-middleware/dist/types";
import { IncomingMessage, OutgoingHttpHeaders, RequestOptions } from "http";
import errorHandler from "./middlewares/globalErrorHandler";
import { authProxy } from "./proxy/auth";
import { moviesProxy } from "./proxy/movies";
import { verifyJWTMiddleware } from "./middlewares/verifyJWTMiddleware";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

// IP-based rate limiting for sensitive endpoints
app.use(rateLimiterMiddleware);

//log the API call
app.use(morgan("dev"));

//proxyRoutes
app.use("/v1/auth", authProxy);
app.use("/v1/movies", verifyJWTMiddleware, moviesProxy);

//error handler
app.use(errorHandler);

//server listner
app.listen(PORT, () => {
  logger.info(`API-gateway is running on port ${PORT}`);
  logger.info(
    `User service is running on port ${process.env.USER_SERVICE_URL}`
  );
});

//uncoughterrorhandler
