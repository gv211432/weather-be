import { Request, Response } from 'express';


/**
 * @param ip IP to validate
 * @returns true if the IP is valid
 * @dev checks if the IP is valid
 */
export function isValidIPV4(ip: string): boolean {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
  return ipv4Regex.test(ip);
}

/**
 * @param req Request object
 * @returns Client IP address
 * @dev gets the client IP address
 */
export const getClientIp = (req: Request) => {
  const xForwardedFor = req.headers['x-forwarded-for'] as string;
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0];
  }
  return req.ip as string;
};