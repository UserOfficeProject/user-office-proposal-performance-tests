import { logger } from '@user-office-software/duo-logger';
import dotenv from 'dotenv';
import express from 'express';
import { validate } from './utils/helper-functions';
import oracledb from 'oracledb';
import database from './db/database';
import { AddressInUseError } from './utils/customTypes';
import users, {
  FIRST_USER_ID,
  generateUserId,
  MAXIMUM_NUMBER_OF_USER_IDS,
} from './middlewares/users';
import heathCheck from './middlewares/heathCheck';
import { createUserDataSource, UserDataSource } from './datasources/userDataSource';

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
    const connectionPool: oracledb.Pool = db.getConnectionPool();
    app.use(users(db.getConnectionPool()));
    app.use(heathCheck());
    process.on('exit', async () => {
      logger.logInfo('Clearing user data', {});
      await userDataSource.deleteUsersBetween(
        FIRST_USER_ID,
        FIRST_USER_ID - MAXIMUM_NUMBER_OF_USER_IDS
      );
      await db.closeConnectionPool();
    });
    const userDataSource: UserDataSource = await createUserDataSource(connectionPool);

    logger.logInfo('Clearing user data', {});
    await userDataSource.deleteUsersBetween(
      FIRST_USER_ID,
      FIRST_USER_ID - MAXIMUM_NUMBER_OF_USER_IDS
    );

    logger.logInfo('Pre create 500 users ', {});
    const userIdGenerator = generateUserId();
    const userIds: number[] = [];

    for (let index = 1; index <= 500; index++) {
      const userId = userIdGenerator.next().value;
      if (userId) {
        userIds.push(userId);
      }
    }
    const sessionIds = await userDataSource.createLoggedInUsers(userIds);
    if (sessionIds.length > 0) {
      
      logger.logInfo('Created pre start up users', {
        number: sessionIds.length,
      });
    } else {
      logger.logException('Error starting server could not create users:', {});
      process.exit();
    }

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
