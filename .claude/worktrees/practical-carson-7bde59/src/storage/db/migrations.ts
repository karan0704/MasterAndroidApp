import type { NitroSQLiteConnection } from 'react-native-nitro-sqlite';

interface DatabaseMigration {
  version: number;
  statements: string[];
}

const DATABASE_MIGRATIONS: DatabaseMigration[] = [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS notes_metadata (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        file_path TEXT NOT NULL,
        preview_text TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'personal',
        is_pinned INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        last_opened_at TEXT NOT NULL,
        sync_status TEXT NOT NULL DEFAULT 'local',
        has_reminder INTEGER NOT NULL DEFAULT 0,
        has_attachment INTEGER NOT NULL DEFAULT 0
      );`,
      `CREATE INDEX IF NOT EXISTS idx_notes_metadata_updated_at
        ON notes_metadata(updated_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_notes_metadata_last_opened_at
        ON notes_metadata(last_opened_at DESC);`,
      `CREATE INDEX IF NOT EXISTS idx_notes_metadata_is_pinned
        ON notes_metadata(is_pinned DESC);`,
    ],
  },
];

export async function runMigrations(database: NitroSQLiteConnection) {
  const versionResult = await database.executeAsync<{ user_version: number }>(
    'PRAGMA user_version;',
  );

  const currentVersion = Number(versionResult.rows.item(0)?.user_version ?? 0);

  for (const migration of DATABASE_MIGRATIONS) {
    if (migration.version <= currentVersion) {
      continue;
    }

    for (const statement of migration.statements) {
      await database.executeAsync(statement);
    }

    await database.executeAsync(`PRAGMA user_version = ${migration.version};`);
  }
}
