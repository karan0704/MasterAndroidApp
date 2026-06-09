import {
  NitroSQLite,
  type NitroSQLiteConnection,
  type QueryResultRow,
  type SQLiteQueryParams,
} from 'react-native-nitro-sqlite';

import { runMigrations } from './migrations';

const DATABASE_NAME = 'master-android-app.db';

let databaseConnection: NitroSQLiteConnection | null = null;
let databaseReadyPromise: Promise<NitroSQLiteConnection> | null = null;

export async function getDatabase() {
  if (!databaseReadyPromise) {
    databaseReadyPromise = (async () => {
      if (!databaseConnection) {
        databaseConnection = NitroSQLite.open({
          name: DATABASE_NAME,
        });
      }

      await runMigrations(databaseConnection);

      return databaseConnection;
    })();
  }

  return databaseReadyPromise;
}

export async function executeDatabaseQuery<Row extends QueryResultRow>(
  query: string,
  params: SQLiteQueryParams = [],
) {
  const database = await getDatabase();

  return database.executeAsync<Row>(query, params);
}
