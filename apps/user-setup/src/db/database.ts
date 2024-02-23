import { logger } from '@user-office-software/duo-logger';
import oracledb from 'oracledb';

export default async function () {
  const { USERNAME: user, PASSWORD: password, CONNECTION_STRING: connectionString } = process.env;

  if (!user) {
    throw new Error('USERNAME environment variable was not set');
  }

  if (!password) {
    throw new Error('PASSWORD environment variable was not set');
  }

  if (!connectionString) {
    throw new Error('CONNECTION_STRING environment variable was not set');
  }

  logger.logInfo('Creating data source connection pool', {});

  const pool = await oracledb.createPool({
    user,
    password,
    connectionString,
  });

  const connection: oracledb.Connection | null = await oracledb
    .getConnection()
    .then((connection) => {
      logger.logInfo('Connected to database', {});

      return connection;
    })
    .catch((error) => {
      logger.logException('Failed to connected to database', error);
      throw new Error('Failed to connected to database');
    });

  if (connection) {
    await connection.close().catch((error) => {
      logger.logException('Failed to close database connection', error);
      throw new Error('Failed to close database connection');
    });
  }

  return {
    getConnectionPool() {
      return pool;
    },
    async getConnection(): Promise<oracledb.Connection> {
      return await oracledb.getConnection();
    },
    async closeConnectionPool() {
      logger.logInfo('Closing database connection pool', {});
      try {
        await oracledb.getPool().close(10);
        logger.logInfo('Database connect pool closed', {});
      } catch (error) {
        logger.logException('Failed to close database connection pool', error);
        throw new Error('Failed to close database connection pool');
      }
    },
  };
}
