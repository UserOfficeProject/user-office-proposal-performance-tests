import { logger } from '@user-office-software/duo-logger';
import express, { Request, Response } from 'express';
import oracledb from 'oracledb';
import { createUserDataSource, UserDataSource } from '../datasources/userDataSource';

const firstId = -220800000;
const maximumNumberOfIds = 1000;
const lastId = firstId - maximumNumberOfIds;

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
function* generateId() {
  let id = firstId;
  while (true) {
    yield id--;
    if (id < lastId) {
      throw new Error('Too many users');
    }
  }
}

const userIdGenerator = generateId();
const router = express.Router();

export default function (pool: oracledb.Pool) {
  router.post(
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
      const totalLength = Math.abs(firstUserId - lastUserId);
      if (totalLength > maximumNumberOfIds) {
        logger.logException('Attempt to create users greater than the maximum', {
          requestedUsers: totalLength,
        });
        res.status(500).send(`Attempt to create users greater than the maximum`);
        return;
      }

      const dataSource: UserDataSource = await createUserDataSource(pool);
      const userRequests = [];
      for (let userId = firstUserId; userId <= lastUserId; userId++) {
        userRequests.push(dataSource.createLoggedInUser(userId));
      }
      const users = await Promise.all(userRequests);
      if (users.length > 0) {
        logger.logInfo('Created logins,people,establishments and addresses', {
          number: users.length,
        });
      }

      res.status(200).json(users);
    })
  );
  router.post(
    '/users/:number',
    handleError(async (req: Request, res: Response) => {
      const { number } = req.params;
      const dataSource: UserDataSource = await createUserDataSource(pool);
      const sessionIds = await Promise.all(
        Array.from({ length: +number || 1 }, () => {
          const userId = userIdGenerator.next().value;
          if (userId) {
            return dataSource.createLoggedInUser(userId);
          }
          return;
        })
      );

      if (sessionIds.length > 0) {
        logger.logInfo('Created logins,people,establishments and addresses', {
          number,
        });
      }

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
