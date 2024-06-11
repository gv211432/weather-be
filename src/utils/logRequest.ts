import { RequestBody } from "swagger-jsdoc";

/**
 * Middleware that logs the request method, URL, status code, time, and duration of the request
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 * @returns void
 */
export const logRequest = (req: any, res: any, next: any) => {
  const start = Date.now();

  // Event listener for the 'finish' event, which is emitted when the response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Time: ${new Date().toISOString()} - Duration: ${duration}ms`;
    console.log(log);
  });

  next();
};