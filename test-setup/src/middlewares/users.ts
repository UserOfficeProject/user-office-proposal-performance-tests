import { logger } from '@user-office-software/duo-logger';
import express, { Request, Response } from 'express';
import oracledb from 'oracledb';
import { createUserDataSource, UserDataSource } from '../datasources/userDataSource';

export const FIRST_USER_ID = -220800000;
export const MAXIMUM_NUMBER_OF_USER_IDS = 1000;
const LAST_USER_ID = FIRST_USER_ID - MAXIMUM_NUMBER_OF_USER_IDS;

function handleError(
  func: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response) => Promise<void> {
  return async (req, res) => {
    try {
      await func(req, res);
    } catch (e) {
      logger.logException('Error completing request: ', e);
      res.status(500).send();
    }
  };
}
export function* generateUserId() {
  let id = FIRST_USER_ID;
  while (true) {
    yield id--;
    if (id < LAST_USER_ID) {
      throw new Error('Too many users');
    }
  }
}

const userIdGenerator = generateUserId();
const router = express.Router();

export default function (pool: oracledb.Pool) {
  router.post(
    '/users/:firstId/:lastId',
    handleError(async (req: Request, res: Response) => {
      const { firstId, lastId } = req.params;
      const firstUserId = Math.max(+firstId, +lastId);
      const lastUserId = Math.min(+firstId, +lastId);

      const totalLength = Math.abs(firstUserId - lastUserId);
      if (totalLength > MAXIMUM_NUMBER_OF_USER_IDS) {
        logger.logException('Attempt to create users greater than the maximum', {
          requestedUsers: totalLength,
        });
        res.status(500).send(`Attempt to create users greater than the maximum`);
        return;
      }
      const userIds: number[] = [];

      for (let userId = firstUserId; userId <= lastUserId; userId++) {
          userIds.push(userId);
      }
      const dataSource: UserDataSource = await createUserDataSource(pool);
      const sessionIds = await dataSource.createLoggedInUsers(userIds);
      
      if (sessionIds.length > 0) {
        logger.logInfo('Created logins,people,establishments and addresses', {
          number: sessionIds.length,
        });
      }

      res.status(200).json(sessionIds);
    })
  );
  router.post(
    '/users/:number',
    handleError(async (req: Request, res: Response) => {
      const { number } = req.params;
      const dataSource: UserDataSource = await createUserDataSource(pool);
      const userIds: number[] = [];

      for (let index = 1; index <= +number; index++) {
        const userId = userIdGenerator.next().value;
        if (userId) {
          userIds.push(userId);
        }
      }
      const sessionIds = await dataSource.createLoggedInUsers(userIds);

      if (sessionIds.length > 0) {
        logger.logInfo('Created logins,people,establishments and addresses', {
          number,
        });
      }

      res.status(200).json(sessionIds);
    })
  );

  router.get(
    '/users/:number',
    handleError(async (req: Request, res: Response) => {
      const { number } = req.params;

      if (+number > MAXIMUM_NUMBER_OF_USER_IDS) {
        logger.logException('Attempt to get users greater than the maximum', {
          requestedUsers: MAXIMUM_NUMBER_OF_USER_IDS,
        });
        res.status(500).send(`Attempt to get users greater than the maximum`);
        return;
      }
      const dataSource: UserDataSource = await createUserDataSource(pool);
      const sessionIds = await dataSource.getUsersBetween(FIRST_USER_ID, FIRST_USER_ID - +number);

      logger.logInfo('Returning logins,people,establishments and addresses', {
        number: sessionIds.length,
      });
      res.status(200).json(sessionIds);
    })
  );
  router.delete(
    '/users/:sessionId',
    handleError(async (req: Request, res: Response) => {
      const { sessionId } = req.params;
      const dataSource: UserDataSource = await createUserDataSource(pool);
      await dataSource.deleteUser(sessionId);

      res.status(204).send();
    })
  );

  router.delete(
    '/users/:firstId/:lastId',
    handleError(async (req: Request, res: Response) => {
      const { firstId, lastId } = req.params;
      let firstUserId = +firstId;
      let lastUserId = +lastId;
      if (firstUserId > lastUserId) {
        const temp = firstUserId;
        firstUserId = lastUserId;
        lastUserId = temp;
      }
      const dataSource: UserDataSource = await createUserDataSource(pool);
      await dataSource.deleteUsersBetween(firstUserId, lastUserId);
      logger.logInfo('Users deleted', { firstId, lastId });
      res.status(204).send();
    })
  );
  return router;
}
