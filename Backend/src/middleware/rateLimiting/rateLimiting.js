import rateLimiterInstance from "../../config/upstash.js";

/**
 * Extract client IP from various sources (handles proxies and load balancers)
 * Priority: X-Forwarded-For header -> req.ip (set by Express with trust proxy) -> socket remoteAddress
 * @param {Object} req - Express request object
 * @returns {string} - Client IP address or fallback identifier
 */
const getClientIP = (req) => {
  // X-Forwarded-For: client, proxy1, proxy2 (we want the first one = original client)
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // req.ip works correctly when app.set('trust proxy', true) is configured
  if (req.ip) {
    return req.ip;
  }

  // Fallback to socket connection
  return req.socket?.remoteAddress || "unknown user";
};

/**
 * @description
 * Rate limiting middleware using Upstash with Redis for distributed rate limiting
 * It's used to prevent abuse and ensure fair usage of the API by limiting the number of requests from a specific IP address.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} - if success, calls next() to continue to the next middleware
 * @returns {Object} - if error, returns an error message of 429 (Too Many Requests) or 500 (Internal Server Error)
 */
const rateLimiting = async (req, res, next) => {
  try {
    // The use of *clientIP* is necessary to identify the client's IP address in this case,
    // but could also be a hardcoded value such as 'global-test-rate-limit'
    // In a scenario of proxy or load balancer, the IP address may be different, so its not a good
    // idea to use it in real world applications. Fot that, you should use a more robust solution
    // Such as a more reliable user identifier or a token, like in a scenario where authentication is already in place
    // for this project, we'll use the clientIP as a fallback, since its a simple project and we don't have authentication for now (upcoming feature)
    const clientIP = getClientIP(req);
    const { success } = await rateLimiterInstance.limit(clientIP);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, try again later" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default rateLimiting;
