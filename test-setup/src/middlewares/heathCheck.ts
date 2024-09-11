import { logger } from '@user-office-software/duo-logger';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  logger.logInfo(`Heath check request successful ${JSON.stringify(req?.params)}`, {});
  res.status(200).send();
});

export default function () {
  return router;
}
