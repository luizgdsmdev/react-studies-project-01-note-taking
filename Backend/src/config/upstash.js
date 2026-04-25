import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

/**
 * @description Rate limiter instance using sliding window algorithm, allowing 15 requests per 10 seconds.
 * Upstash provides a free tier for rate limiting using Redis.
 * @type {Ratelimit}
 */
const rateLimiterInstance = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
    process.env.RATE_LIMIT_WINDOW,
  ),
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit-react_studies_project_01_note_taking",
});

export default rateLimiterInstance;
