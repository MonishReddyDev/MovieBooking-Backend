import proxy from "express-http-proxy";
import { Request, Response } from "express";
import { IncomingMessage, RequestOptions, OutgoingHttpHeaders } from "http";
import { proxyOptions } from "./proxyOptions";
import logger from "../utils/logger";

const USER_SERVICE = process.env.USER_SERVICE_URL as string;

export const authProxy = proxy(USER_SERVICE, {
  ...proxyOptions,
  proxyReqOptDecorator: (
    proxyReqOpts: RequestOptions,
    srcReq: Request
  ): RequestOptions => {
    proxyReqOpts.headers = {
      ...proxyReqOpts.headers,
      "Content-Type": "application/json",
    } as OutgoingHttpHeaders;
    // Forward Authorization header if present
    if (srcReq.headers["authorization"]) {
      proxyReqOpts.headers["Authorization"] = srcReq.headers["authorization"];
    }
    return proxyReqOpts;
  },
  userResDecorator: (
    proxyRes: IncomingMessage,
    proxyResData: Buffer,
    userReq: Request,
    userRes: Response
  ): Buffer => {
    logger.info(`Response from User-service: ${proxyRes.statusCode}`);
    if ((proxyRes.statusCode ?? 500) >= 400) {
      const errorMessage =
        proxyResData.toString("utf8") || "Downstream service error";
      throw new Error(
        `User Service failed with status ${proxyRes.statusCode}: ${errorMessage}`
      );
    }
    return proxyResData;
  },
});
