import { logger } from '@user-office-software/duo-logger';
import dotenv from 'dotenv';
import express from 'express';

import database from './src/db/database';
import users from './src/users';
import { AddressInUseError } from './src/utils/customTypes';

dotenv.config();

async function startServer() {
  try {
    const db = await database();
    const port = process.env.PORT || 8000;
    const app = express();

    app.use(users(db.getConnectionPool()));

    process.on('exit', async () => {
      await db.closeConnectionPool();
    });

    logger.logInfo('Stating server ...', {});
    app
      .listen(port, () => {
        logger.logInfo(`Listening on ${port}`, {});
      })
      .on('error', (error: AddressInUseError) => {
        // Type guard for EADDRINUSE errors
        if (error['code'] === 'EADDRINUSE') {
          logger.logException('Port already in use:', error);
        } else {
          logger.logException('Server error:', error);
        }
      });
  } catch (error) {
    logger.logException('Error while starting server', error);
  }
}

startServer();
