import { randomUUID } from 'crypto';

import { logger } from '@user-office-software/duo-logger';
import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
type UserResult = { sessionId: string; userId: number; email: string };
type UserSessionResult = { USER_ID: number };
export class UserDataSource {
  constructor(private pool: oracledb.Pool) {
    this.pool = pool;
  }

  async getUsersBetween(firstUserId: number, lastUserId: number): Promise<UserResult[]> {
    if (firstUserId === undefined) {
      throw new Error('first undefined, will not clear down');
    }
    if (lastUserId === undefined) {
      throw new Error('last undefined, will not clear down');
    }
    let connection;
    const bind = {
      min: Math.min(firstUserId, lastUserId),
      max: Math.max(firstUserId, lastUserId),
      limit: Math.abs(Math.max(firstUserId, lastUserId) - Math.min(firstUserId, lastUserId)),
    };
    try {
      connection = await this.pool.getConnection();
      const result = await connection.execute(
        `SELECT DISTINCT session_id, user_id, last_access_time FROM login
          WHERE user_id BETWEEN :min AND :max ORDER BY last_access_time FETCH FIRST :limit  ROWS ONLY`,
        bind
      );
      const users = result.rows as unknown as { SESSION_ID: string; USER_ID: number }[];
      if (!users) {
        return [];
      }

      return users.map((user) => {
        return {
          userId: user.USER_ID,
          sessionId: user.SESSION_ID,
          email: `BISAPPSSINK${user.USER_ID}@stfc.ac.uk`,
        };
      });
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
  async getLoggedInUser(userId: number): Promise<UserResult> {
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
        `
        MERGE INTO address  AD
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (AD.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid,country,from_date) 
          VALUES ( S.rid,'United Kingdom',CURRENT_DATE)
        WHEN MATCHED THEN  
            UPDATE 
            SET AD.from_date = CURRENT_DATE`,
        bind
      );
      const { rowsAffected: establishmentCreated } = await connection.execute(
        `
        MERGE INTO establishment ES
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (ES.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid, establishment_id, postal_address_id, org_name, dept_name, from_date) 
          VALUES ( S.rid, :rid, :rid,'Test org', 'Test dept', CURRENT_DATE)
        WHEN MATCHED THEN  
            UPDATE 
            SET ES.from_date = CURRENT_DATE`,
        bind
      );
      const { rowsAffected: privacyCreated } = await connection.execute(
        `
        MERGE INTO privacy PR
        USING (
          SELECT :rid AS privacy_id FROM DUAL
          ) S ON (PR.privacy_id = S.privacy_id)
        WHEN NOT MATCHED THEN 
          INSERT (privacy_id, searchable) 
          VALUES ( S.privacy_id,'Yes')
        WHEN MATCHED THEN  
            UPDATE 
            SET PR.searchable = 'Yes'`,
        bind
      );

      const { rowsAffected: personCreated } = await connection.execute(
        `
        MERGE INTO person PS
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (PS.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid, user_number,
                  title, given_name, family_name, status,
                  email, work_phone,
                  establishment_id, org_correspondence_id, home_correspondence_id,
                  from_date, dpa, verified,
                  isis_salt, sha2, lastpwdreset,privacy_id) 
          VALUES ( S.rid, S.rid,
                  'Mx', 'Test', 'Account', 'Postdoctoral Researcher',
                  'BISAPPSSINK' || S.rid || '@stfc.ac.uk', '012345123456',
                    S.rid, S.rid, S.rid,
                    CURRENT_DATE, 'TRUE', 'Yes',
                  'X', 'X', CURRENT_DATE,:rid)
        WHEN MATCHED THEN  
            UPDATE 
            SET PS.from_date = CURRENT_DATE`,
        bind
      );

      const { rowsAffected: loginCreated } = await connection.execute(
        `
        MERGE INTO login LG
        USING (
          SELECT :rid AS user_id , :uuid AS session_id FROM DUAL
          ) S ON (LG.user_id = S.user_id AND LG.session_id = S.session_id )
        WHEN NOT MATCHED THEN 
          INSERT (session_id, user_id, last_access_time) 
          VALUES ( S.session_id, S.user_id, CURRENT_DATE + INTERVAL '4' HOUR)
        WHEN MATCHED THEN  
            UPDATE 
            SET LG.last_access_time = CURRENT_DATE + INTERVAL '4' HOUR`,
        Object.assign({}, bind, uuidBind)
      );
      await connection.commit();

      if (
        !(
          addressCreated &&
          loginCreated &&
          personCreated &&
          addressCreated &&
          privacyCreated &&
          establishmentCreated
        )
      ) {
        throw new Error('Fail to create user login details');
      }

      return {
        userId,
        sessionId: uuid,
        email: `BISAPPSSINK${userId}@stfc.ac.uk`,
      };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
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
      const { rowsAffected: peopleDeleted } = await connection.execute(
        `DELETE FROM person
          WHERE user_number BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );
      const { rowsAffected: privacyDeleted } = await connection.execute(
        `DELETE FROM privacy
          WHERE privacy_id BETWEEN :min AND :max`,
        bind
      );
      const { rowsAffected: loginsDeleted } = await connection.execute(
        `DELETE FROM login
         WHERE user_id BETWEEN :min AND :max`,
        bind
      );

      const { rowsAffected: addressesDeleted } = await connection.execute(
        `DELETE FROM address
          WHERE postal_address_id BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );

      const { rowsAffected: establishmentsDeleted } = await connection.execute(
        `DELETE FROM establishment
          WHERE establishment_id BETWEEN :min AND :max
                OR rid BETWEEN :min AND :max`,
        bind
      );

      await connection.commit();

      logger.logInfo('Deleted logins, people, establishments and addresses', {
        first,
        last,
        loginsDeleted,
        privacyDeleted,
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

  async createLoggedInUsers(userIds: number[]): Promise<UserResult[]> {
    let connection;
    if(!userIds || !userIds.length){
       return []
    }
    try {
      connection = await this.pool.getConnection();
      const binds: { rid: number }[] = userIds.map((userId) => {
        return {
          rid: userId,
        };
      });

      const uuidBinds = binds.map((bind) => {
        const uuid = randomUUID();
        return {
          ...bind,
          uuid,
        };
      });
      const options = {
        autoCommit: false,
        bindDefs: {
          rid: { type: oracledb.NUMBER },
        },
      };

      const { rowsAffected: addressCreated } = await connection.executeMany(
        `
        MERGE INTO address  AD
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (AD.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid,country,from_date) 
          VALUES ( S.rid,'United Kingdom',CURRENT_DATE)
        WHEN MATCHED THEN  
            UPDATE 
            SET AD.from_date = CURRENT_DATE`,
        binds,
        options
      );
      const { rowsAffected: establishmentCreated } = await connection.executeMany(
        `
        MERGE INTO establishment ES
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (ES.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid, establishment_id, postal_address_id, org_name, dept_name, from_date) 
          VALUES ( S.rid, :rid, :rid,'Test org', 'Test dept', CURRENT_DATE)
        WHEN MATCHED THEN  
            UPDATE 
            SET ES.from_date = CURRENT_DATE`,
        binds,
        options
      );
      const { rowsAffected: privacyCreated } = await connection.executeMany(
        `
        MERGE INTO privacy PR
        USING (
          SELECT :rid AS privacy_id FROM DUAL
          ) S ON (PR.privacy_id = S.privacy_id)
        WHEN NOT MATCHED THEN 
          INSERT (privacy_id, searchable) 
          VALUES ( S.privacy_id,'Yes')
        WHEN MATCHED THEN  
            UPDATE 
            SET PR.searchable = 'Yes'`,
        binds,
        options
      );

      const { rowsAffected: personCreated } = await connection.executeMany(
        `
        MERGE INTO person PS
        USING (
          SELECT :rid AS rid FROM DUAL
          ) S ON (PS.rid = S.rid)
        WHEN NOT MATCHED THEN 
          INSERT (rid, user_number,
                  title, given_name, family_name, status,
                  email, work_phone,
                  establishment_id, org_correspondence_id, home_correspondence_id,
                  from_date, dpa, verified,
                  isis_salt, sha2, lastpwdreset,privacy_id) 
          VALUES ( S.rid, S.rid,
                  'Mx', 'Test', 'Account', 'Postdoctoral Researcher',
                  'BISAPPSSINK' || S.rid || '@stfc.ac.uk', '012345123456',
                    S.rid, S.rid, S.rid,
                    CURRENT_DATE, 'TRUE', 'Yes',
                  'X', 'X', CURRENT_DATE,:rid)
        WHEN MATCHED THEN  
            UPDATE 
            SET PS.from_date = CURRENT_DATE`,
        binds,
        options
      );

      const { rowsAffected: loginCreated } = await connection.executeMany(
        `
        MERGE INTO login LG
        USING (
          SELECT :rid AS user_id , :uuid AS session_id FROM DUAL
          ) S ON (LG.user_id = S.user_id AND LG.session_id = S.session_id )
        WHEN NOT MATCHED THEN 
          INSERT (session_id, user_id, last_access_time) 
          VALUES ( S.session_id, S.user_id, CURRENT_DATE + INTERVAL '4' HOUR)
        WHEN MATCHED THEN  
            UPDATE 
            SET LG.last_access_time = CURRENT_DATE + INTERVAL '4' HOUR`,
        uuidBinds,
        {
          autoCommit: false,
          bindDefs: {
            rid: { type: oracledb.NUMBER },
            uuid: { type: oracledb.STRING, maxSize: 40 },
          },
        }
      );
      await connection.commit();

      if (
        !(
          addressCreated &&
          loginCreated &&
          personCreated &&
          addressCreated &&
          privacyCreated &&
          establishmentCreated
        )
      ) {
        throw new Error('Fail to create users login details');
      }

      return uuidBinds.map((uuidBind) => {
        return {
          userId: uuidBind.rid,
          sessionId: uuidBind.uuid,
          email: `BISAPPSSINK${uuidBind.rid}@stfc.ac.uk`,
        };
      });
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
