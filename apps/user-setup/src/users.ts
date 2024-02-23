import { logger } from '@user-office-software/duo-logger';
import express, { Request, Response } from 'express';
import oracledb from 'oracledb';

import { UserDataSource, createUserDataSource } from './userDataSource';

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
    '/users/:number',
    handleError(async (req: Request, res: Response) => {
      const { number } = req.params;
      const dataSource: UserDataSource = await createUserDataSource(pool);
      //clean up
      await dataSource.deleteUsersBetween(firstId, lastId);
      const sessionIds = await Promise.all(
        Array.from({ length: +number || 1 }, () => {
          const userId = userIdGenerator.next().value;
          if (userId) {
            return dataSource.createLoggedInUser(userId);
          }
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
    '/users/',
    handleError(async (req: Request, res: Response) => {
      const dataSource: UserDataSource = await createUserDataSource(pool);
      await dataSource.deleteUsersBetween(firstId, lastId);

      res.status(204).send();
    })
  );

  /*
   * Used to  check if the application is ready to receive requests.
   */
  router.get(
    '/ping/',
    handleError(async (req: Request, res: Response) => {
      res.status(204).send();
    })
  );

  return router;
}
