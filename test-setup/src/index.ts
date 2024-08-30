import { logger } from '@user-office-software/duo-logger';
import dotenv from 'dotenv';
import express from 'express';
import { validate } from './utils/helper-functions';
import database from './db/database';
import { AddressInUseError } from './utils/customTypes';
import users from './middlewares/users';
import heathCheck from './middlewares/heathCheck';

/**
 * Set this to dotenv.config() when running script in local non containerized environment
 */
if (process.env.TEST_SETUP_DOTENV_PATH) {
  dotenv.config({
    path: validate<string>(process.env.TEST_SETUP_DOTENV_PATH as string, 'USER_SETUP_DOTENV_PATH'),
  });
} else {
  dotenv.config();
}
async function startServer() {
  try {
    const db = await database();
    const port = process.env.PORT || 8000;
    const app = express();

    app.use(users(db.getConnectionPool()));
    app.use(heathCheck());
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
