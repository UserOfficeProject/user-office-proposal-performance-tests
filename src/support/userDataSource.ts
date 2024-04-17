import { getDatabaseClient } from './database';
import { numberGenerator, randomUUIDv4 } from '../utils/helperFunctions';
import {
  UserLogin,
  DatabaseClientConnector,
  DatabaseClient,
} from '../utils/sharedType';

export class UserDataSource {
  db: DatabaseClient;
  constructor(username: string, password: string, connectionString: string) {
    this.db = getDatabaseClient(
      DatabaseClientConnector.ORACLE,
      username,
      password,
      connectionString
    );
  }

  async getUser(userId: number): Promise<UserLogin> {
    const transaction = this.db.begin();
    try {
      const uuid = randomUUIDv4();
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
        `INSERT INTO person (
                         rid, user_number,
                         title, given_name, family_name, status,
                         email, work_phone,
                         establishment_id, org_correspondence_id, home_correspondence_id,
                         from_date, dpa, verified,
                         isis_salt, sha2, lastpwdreset
                       )
           VALUES (
                    :userId, :userId,
                    'Mx', 'Test', 'Account', 'Postdoctoral Researcher',
                    'BISAPPSSINK' || :userId || '@stfc.ac.uk', '012345123456',
                    :userId, :userId, :userId,
                    CURRENT_DATE, 'TRUE', 'Yes',
                    'X', 'X', CURRENT_DATE
                  )`,
        userId
      );

      transaction.exec(
        `INSERT INTO login (session_id, user_id, last_access_time) VALUES (:uuid, :userId, CURRENT_DATE)`,
        uuid,
        userId
      );

      transaction.commit();

      return {
        userId,
        sessionId: uuid,
      };
    } catch (error) {
      console.error(
        `Error during creating user credentials for userId: ${userId}:`,
        error
      );
      if (transaction) {
        transaction.rollback();
      }
      throw new Error(`Fail to create user credentials userId: ${userId}`);
    }
  }

  async deleteUser(userId: number) {
    const transaction = this.db.begin();
    try {
      transaction.exec(
        `DELETE FROM login
         WHERE user_id =:userId`,
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
    }
  }
  async getUsersBetween(
    firstUserId: number,
    lastUserId: number
  ): Promise<UserLogin[]> {
    await this.deleteUsersBetween(firstUserId, lastUserId);
    const userIdGenerator = numberGenerator(firstUserId);
    const userPromises: Promise<UserLogin>[] = [];
    let userId;
    while ((userId = userIdGenerator.next().value) && userId < lastUserId) {
      userPromises.push(this.getUser(userId));
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
    const transaction = this.db.begin();
    try {
      transaction.exec(
        `DELETE FROM login
         WHERE user_id BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );

      transaction.exec(
        `DELETE FROM person
          WHERE user_number BETWEEN :firstUserId AND :lastUserId
                OR rid BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );
      transaction.exec(
        `DELETE FROM establishment
          WHERE establishment_id BETWEEN :firstUserId AND :lastUserId
                OR rid BETWEEN :firstUserId AND :lastUserId`,
        firstUserId,
        lastUserId
      );

      transaction.exec(
        `DELETE FROM address
          WHERE postal_address_id BETWEEN :firstUserId AND :lastUserId
                OR rid BETWEEN :firstUserId AND :lastUserId`,
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
    }
  }
}
