"use client";

import { Router, Request, Response } from 'express';
import swaggerConfig from "../../swagger-config";
import { disbaledSwagger } from '../config/basic';


const router = Router();
// json config for swagger
router.get('/swagger', (req: Request, res: Response) => {
  res.json(process.env.DOCS_ENABLED == "true" ? swaggerConfig : disbaledSwagger);
});

export default router;
