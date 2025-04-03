import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "../config/redisClient";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 100, // Number of requests allowed
  duration: 30, // Duration in seconds (1 minute)
  blockDuration: 60 * 15, // Block for 15 minutes if rate limit exceeded
  keyPrefix: "rate-limit-api-gateway",
});

export default rateLimiter;
