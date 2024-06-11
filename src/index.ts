

// ╻ ╻┏━╸┏━┓╺┳╸╻ ╻┏━╸┏━┓   ┏┓ ┏━╸
// ┃╻┃┣╸ ┣━┫ ┃ ┣━┫┣╸ ┣┳┛╺━╸┣┻┓┣╸ 
// ┗┻┛┗━╸╹ ╹ ╹ ╹ ╹┗━╸╹┗╸   ┗━┛┗━╸


import dotenv from 'dotenv';
import path from 'path';

// dynamically load the environment variables based on the NODE_ENV
const envPath = path.join(__dirname, `../../.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envPath });

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import docsRouter from './api/docs';
import userCreate from './api/user/create';
import userLogin from './api/user/login';
import { syncDb } from './database/syncDb';
import passportRouter from './service/passport';
import googleAuthRouter from './api/user/auth/google';
import facebookAuthRouter from './api/user/auth/facebook';
import profilRouter from './api/user/profile';
import { logRequest } from './utils/logRequest';
import weatherRouter from './api/weather/info';
import { digestError } from './service/logger';


// Initialize Express
const app = express();
const PORT = process.env.PORT as unknown as number || 3000;
const host = process.env.HOST || '0.0.0.0';

// Middlewares

// CORS
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your allowed origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportRouter);

// Use the hello router
app.use('/api', docsRouter);
app.use('/api', userCreate);
app.use('/api', userLogin);
app.use('/api', profilRouter);
app.use('/api', googleAuthRouter);
app.use('/api', facebookAuthRouter);
app.use('/api', weatherRouter);

// serve swagger ui and render the above json
app.use('/', swaggerUi.serve);
// @ts-ignore
app.get('/', swaggerUi.setup(null, { swaggerUrl: '/api/swagger' }));


// 404 Not Found
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

// Start the server and connect to the database
const start = async () => {
  try {
    // Connect to the database and sync the models
    await syncDb();

    // Start the server
    app.listen(PORT, host, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    await digestError('Failed to start the server', error);
  }
};

start();
