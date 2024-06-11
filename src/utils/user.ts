
import axios from "axios";
import { isValidIPV4 } from "./basic";
import User from "../models/User";

/**
 * Filter user object to remove password
 * @param user User object
 * @returns User object without password
 */
export const filterUser = (user: User) => {
  const { password, ...filteredUser } = user;
  return filteredUser;
};


/**
 * Get IP information
 * @param ip IP address
 * @returns IP information
 */
export const getIpInfo = async (ip: string) => {
  if (!isValidIPV4(ip) && ip != "::1") return null;
  // if localhost, paste this 49.43.24.152 as ip, it will not crash in dev mode
  const info = await axios.get<IpInfo>(`http://ipinfo.io/${ip == "::1" ? "49.43.24.152" : ip}`).then(res => res.data);
  return info;
};