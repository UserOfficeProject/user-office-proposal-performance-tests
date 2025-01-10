import { logger } from '@user-office-software/duo-logger';
import express, { Request, Response } from 'express';
import oracledb from 'oracledb';
import { createUserDataSource, UserDataSource } from '../datasources/userDataSource';
import UOWSClient from '../client/UOWSClient';
import { PermissionUserGroupDTO } from '../../generated/models/PermissionUserGroupDTO';
import { roles } from '../utils/roleMembership';

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
  router.post('/users/assignRole', async (req: Request, res: Response) => {
    logger.logInfo('Inside assignRole endpoint', {});
    logger.logInfo(`request body ids >> :::: ${req.body.ids}`, {});
    logger.logInfo(`request body rolename >> :::: ${req.body.roleName}`, {});

    const reviewerIds = req.body.ids;
    const requestedRoleName = req.body.roleName;

    if (!reviewerIds || !Array.isArray(reviewerIds) || !requestedRoleName) {
      return res
        .status(400)
        .send({ message: 'Invalid query parameters, expected ids and roleName.' });
    }

    const requestedGroup: PermissionUserGroupDTO[] = [
      {
        id: roles[requestedRoleName].roleId,
        groupName: roles[requestedRoleName].roleName,
      },
    ];

    const promisesArray = reviewerIds.map(async (id) => {
      logger.logInfo(`***** Assigning user ${id} to group ${requestedRoleName}`, {});
      return await UOWSClient.groupMemberships.addPersonToFapGroup({
        userNumber: id,
        groups: requestedGroup,
      });
    });
    return Promise.all(promisesArray)
      .then((results) => {
        results?.forEach((r) => {
          logger.logInfo(`assignment result : ${r?.groups} and ${r?.userNumber}`, {});
        });
        return res.send(200);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ message: 'Error assigning role for users', error });
      });
  });

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
  router.delete('/users/removeRole', async (req: Request, res: Response) => {
    logger.logInfo('Inside removeRole endpoint', {});
    logger.logInfo(`request body ids >> :::: ${req.body.ids}`, {});
    logger.logInfo(`request body rolename >> :::: ${req.body.roleName}`, {});

    const reviewerIds = req.body.ids;
    const requestedRoleName = req.body.roleName;

    if (!reviewerIds || !Array.isArray(reviewerIds) || !requestedRoleName) {
      return res
        .status(400)
        .send({ message: 'Invalid query parameters, expected ids and roleName.' });
    }

    const promisesArray = reviewerIds.map(async (id) => {
      logger.logInfo(`***** Removing user ${id} from group ${requestedRoleName}`, {});
      return await UOWSClient.groupMemberships.removePersonFromFapGroup(
        id,
        roles[requestedRoleName].roleName
      );
    });
    return Promise.all(promisesArray)
      .then(() => {
        return res.send(200);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ message: 'Error removing role for users', error });
      });
  });
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
