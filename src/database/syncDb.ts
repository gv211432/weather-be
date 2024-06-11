import { syncUser } from "../models/User";
import { digestError } from "../service/logger";
import dbConnection from "./postgres";

export const syncDb = async () => {
  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');

    await dbConnection.sync();
    console.log('All models were synchronized successfully.');

    await syncUser();

  } catch (error: any) {
    await digestError('Unable to connect to the database:', error);
  }
};