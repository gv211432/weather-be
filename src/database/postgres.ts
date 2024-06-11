import { Sequelize } from 'sequelize';
import pg from "pg";

// primary database
const dbConnection = new Sequelize(
  process.env?.DATABASE ?? "",
  process.env?.DATABASE_USER ?? "",
  process.env?.DATABASE_PASSWORD ?? "",
  {
    host: process.env?.DATABASE_HOST ?? "",
    port: parseInt(process.env?.DATABASE_PORT ?? "5432"),
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
  }
);

export default dbConnection;
