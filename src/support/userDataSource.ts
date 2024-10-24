import { getDatabaseClient, sqlQuery } from './database';
import { numberGenerator, randomUUIDv4 } from '../utils/helperFunctions';
import { DatabaseClientConnector, UserLogin } from '../utils/sharedType';

export class UserDataSource {
  constructor(
    private username: string,
    private password: string,
    private connectionString: string
  ) {}

  async checkUserExist(userId: number): Promise<boolean> {
    let userList = [];
    if (!userId) {
      throw new Error(`UserId is null or undefined: ${userId}`);
    }
    const db = getDatabaseClient(
      DatabaseClientConnector.ORACLE,
      this.username,
      this.password,
      this.connectionString
    );
    try {
      const query = `SELECT USER_NUMBER FROM person WHERE rid = ${userId.toString()}`;
      userList = sqlQuery(db, query);
    } catch (error) {
      throw new Error(`Fail to query user details userId: ${userId}`);
    } finally {
      db.close();
    }

    return userList.length > 0;
  }

  async createUser(userId: number): Promise<UserLogin> {
    if (!userId) {
      throw new Error(`UserId is null or undefined: ${userId}`);
    }
    const db = getDatabaseClient(
      DatabaseClientConnector.ORACLE,
      this.username,
      this.password,
      this.connectionString
    );
    const transaction = db.begin();
    const uuid = randomUUIDv4();
    try {
      transaction.exec(
        `INSERT INTO address (rid, country, from_date)
           VALUES (:userId, 'United Kingdom', CURRENT_DATE)`,
        userId
      );

      transaction.exec(
        `INSERT INTO establishment (rid, establishment_id, postal_address_id, org_name, dept_name, from_date)
           VALUES (:userId, :userId, :userId, 'Test org', 'Test dept', CURRENT_DATE)`,
        userId
      );
      transaction.exec(
        `INSERT INTO privacy (privacy_id, searchable)
             VALUES (:userId,'Yes')`,
        userId
      );
      transaction.exec(
        `INSERT INTO person (
                         rid, user_number,
                         title, given_name, family_name, status,
                         email, work_phone,
                         establishment_id, org_correspondence_id, home_correspondence_id,
                         from_date, dpa, verified,
                         isis_salt, sha2, lastpwdreset,privacy_id
                       )
           VALUES (
                    :userId, :userId,
                    'Mx', 'Test', 'Account', 'Postdoctoral Researcher',
                    'BISAPPSSINK' || :userId || '@stfc.ac.uk', '012345123456',
                    :userId, :userId, :userId,
                    CURRENT_DATE, 'TRUE', 'Yes',
                    'X', 'X', CURRENT_DATE,:userId
                  )`,
        userId
      );

      transaction.exec(
        `INSERT INTO login (session_id, user_id, last_access_time) VALUES (:uuid, :userId, CURRENT_DATE + INTERVAL '4' HOUR)`,
        uuid,
        userId
      );

      transaction.commit();
    } catch (error) {
      console.error(
        `Error during creating user credentials for userId: ${userId}:`,
        error
      );
      if (transaction) {
        transaction.rollback();
      }
      throw new Error(`Fail to create user credentials userId: ${userId}`);
    } finally {
      db.close();
    }

    return {
      userId,
      sessionId: uuid,
      email: `BISAPPSSINK${userId}@stfc.ac.uk`,
    };
  }

  async deleteUser(userId: number) {
    const db = getDatabaseClient(
      DatabaseClientConnector.ORACLE,
      this.username,
      this.password,
      this.connectionString
    );
    const transaction = db.begin();
    try {
      transaction.exec(
        `DELETE FROM login
         WHERE user_id =:userId`,
        userId
      );
      transaction.exec(
        `DELETE FROM privacy
          WHERE privacy_id =:userId`,
        userId
      );
      transaction.exec(
        `DELETE FROM person
          WHERE user_number =:userId`,
        userId
      );

      transaction.exec(
        `DELETE FROM establishment
          WHERE establishment_id =:userId OR rid =:userId`,
        userId
      );

      transaction.exec(
        `DELETE FROM address
          WHERE postal_address_id =:userId
                OR rid =:userId`,
        userId
      );

      transaction.commit();
    } catch (error) {
      console.error(
        `Error during deleting user credentials for userId: ${userId}:`,
        error
      );
      if (transaction) {
        transaction.rollback();
      }
      throw new Error(`Fail to delete user credentials userId: ${userId}`);
    } finally {
      db.close();
    }
  }
  async getUsersBetween(
    firstUserId: number,
    lastUserId: number
  ): Promise<UserLogin[]> {
    const userIdGenerator = numberGenerator(firstUserId);
    const userPromises: Promise<UserLogin>[] = [];
    let userId;
    while ((userId = userIdGenerator.next().value) && userId < lastUserId) {
      const userExists = await this.checkUserExist(userId);
      if (!userExists) {
        userPromises.push(this.createUser(userId));
      } else {
        console.error(
          `Error during creating user credentials for userId: ${userId} already exists`
        );
      }
    }
    const users = await Promise.all(userPromises);

    return users;
  }
  async deleteUsersBetween(firstUserId: number, lastUserId: number) {
    if (!firstUserId) {
      throw new Error('First userId not defined');
    }
    if (!lastUserId) {
      throw new Error('Last userId not defined');
    }
    const db = getDatabaseClient(
      DatabaseClientConnector.ORACLE,
      this.username,
      this.password,
      this.connectionString
    );
    const transaction = db.begin();
    try {
      transaction.exec(
        `DELETE FROM person
          WHERE user_number BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );
      transaction.exec(
        `DELETE FROM privacy
          WHERE privacy_id BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );
      transaction.exec(
        `DELETE FROM login
         WHERE user_id BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );
      transaction.exec(
        `DELETE FROM address WHERE rid BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );
      transaction.exec(
        `DELETE FROM establishment
          WHERE rid BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );

      transaction.commit();
    } catch (error) {
      console.error(
        `Error during deleting user credentials for users ids between : ${firstUserId} and ${lastUserId}`,
        error
      );
      if (transaction) {
        transaction.rollback();
      }
      throw new Error(
        `Fail to delete user credentials for users ids between: ${firstUserId} and ${lastUserId}`
      );
    } finally {
      db.close();
    }
  }
}
