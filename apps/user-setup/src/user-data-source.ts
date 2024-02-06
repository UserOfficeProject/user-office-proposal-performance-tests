import { randomUUID } from 'crypto';

import { logger } from '@user-office-software/duo-logger';
import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
type UserResult = { sessionId: string };
type UserSessionResult = { USER_ID: number };
export class UserDataSource {
  constructor(private pool: oracledb.Pool) {
    this.pool = pool;
  }

  async deleteUsersBetween(first: number, last: number) {
    if (first === undefined) {
      throw new Error('first undefined, will not clear down');
    }
    if (last === undefined) {
      throw new Error('last undefined, will not clear down');
    }
    let connection;
    try {
      connection = await this.pool.getConnection();

      /*
       * Min and max cause brain hurt for negative numbers. This makes sure
       * they're the right way around to work with SQL.
       */
      const bind = {
        min: Math.min(first, last),
        max: Math.max(first, last),
      };

      const { rowsAffected: loginsDeleted } = await connection.execute(
        `DELETE FROM login
         WHERE user_id BETWEEN :min AND :max`,
        bind
      );

      const { rowsAffected: peopleDeleted } = await connection.execute(
        `DELETE FROM person
          WHERE user_number BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );

      const { rowsAffected: establishmentsDeleted } = await connection.execute(
        `DELETE FROM establishment
          WHERE establishment_id BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );

      const { rowsAffected: addressesDeleted } = await connection.execute(
        `DELETE FROM address
          WHERE postal_address_id BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );

      await connection.commit();

      logger.logInfo('Deleted logins, people, establishments and addresses', {
        first,
        last,
        loginsDeleted,
        peopleDeleted,
        establishmentsDeleted,
        addressesDeleted,
      });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  async createLoggedInUser(userId: number): Promise<UserResult> {
    let connection;
    try {
      connection = await this.pool.getConnection();

      const bind = {
        rid: userId,
      };

      const uuid = randomUUID();
      const uuidBind = {
        uuid,
      };

      const { rowsAffected: addressCreated } = await connection.execute(
        `INSERT INTO address (rid, country, from_date)
         VALUES (:rid, 'United Kingdom', CURRENT_DATE)`,
        bind
      );

      const { rowsAffected: establishmentCreated } = await connection.execute(
        `INSERT INTO establishment (rid, establishment_id, postal_address_id, org_name, dept_name, from_date)
         VALUES (:rid, :rid, :rid, 'Test org', 'Test dept', CURRENT_DATE)`,
        bind
      );

      const { rowsAffected: personCreated } = await connection.execute(
        `INSERT INTO person (
                       rid, user_number,
                       title, given_name, family_name, status,
                       email, work_phone,
                       establishment_id, org_correspondence_id, home_correspondence_id,
                       from_date, dpa, verified,
                       isis_salt, sha2, lastpwdreset
                     )
         VALUES (
                  :rid, :rid,
                  'Mx', 'Test', 'Account', 'Postdoctoral Researcher',
                  'BISAPPSSINK' || :rid || '@stfc.ac.uk', '012345123456',
                  :rid, :rid, :rid,
                  CURRENT_DATE, 'TRUE', 'Yes',
                  'X', 'X', CURRENT_DATE
                )`,
        bind
      );

      const { rowsAffected: loginCreated } = await connection.execute(
        'INSERT INTO login (session_id, user_id, last_access_time) VALUES (:uuid, :rid, CURRENT_DATE)',
        Object.assign({}, bind, uuidBind)
      );

      await connection.commit();

      logger.logInfo('Created logins,people,establishments and addresses', {
        userId,
        loginCreated,
        personCreated,
        establishmentCreated,
        addressCreated,
      });

      return {
        sessionId: uuid,
      };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  async deleteUser(sessionId: string) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const ids = await connection
        .execute(
          `SELECT user_id FROM login
          WHERE session_id = :sessionId`,
          {
            sessionId,
          }
        )
        .then((result) => {
          if (!result) {
            return [];
          }

          return result.rows as [UserSessionResult];
        });

      for (const { USER_ID: id } of ids) {
        await this.deleteUsersBetween(id, id);
      }
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

export async function createUserDataSource(pool: oracledb.Pool) {
  return new UserDataSource(pool);
}
