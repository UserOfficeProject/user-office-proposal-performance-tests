// @ts-expect-error // This line ignores the error (TypeScript)
import sql from 'k6/x/sql';

import { DatabaseClientConnector, DatabaseClient } from '../utils/sharedType';

export function getDatabaseClient(
  client: DatabaseClientConnector,
  username: string,
  password: string,
  connectionString: string
): DatabaseClient {
  /* We should always wrap this connection in a try and catch to avoid leaking database 
     credentials when we fail to login
   */
  try {
    return sql.open(
      client,
      `user="${username}" password="${password}" connectString="${connectionString}"`
    );
  } catch (error) {
    throw new Error(
      'Could not create database client verify you connection string and credentials'
    );
  }
}

export function sqlQuery(db: DatabaseClient, query: string, args?: string) {
  if (args) {
    return sql.query(db, query, args);
  }

  return sql.query(db, query);
}
