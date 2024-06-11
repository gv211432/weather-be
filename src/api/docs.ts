"use client";

import { Router, Request, Response } from 'express';
import swaggerConfig from "../../swagger-config";


const disbaled = {
  info: {
    title: 'Reward Roots API docs',
    version: '0.0.1',
    description: 'API docs are OFF for RewardRoot project.',
    contact: {
      name: 'Rewardroot',
      email: process.env.EMAIL_SENDER_EMAIL ?? "",
      url: 'https://www.rewardroot.com',
    },
    // license: {
    //   name: 'BSUL',
    //   url: 'https://www.example.com/license',
    // },
  },
  securityDefinitions: {
    BasicAuth: {
      type: 'basic',
    },
  },
};


const router = Router();
// json config for swagger
router.get('/swagger', (req: Request, res: Response) => {
  res.json(process.env.DOCS_ENABLED == "true" ? swaggerConfig : disbaled);
});

export default router;
