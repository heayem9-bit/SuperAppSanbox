import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('profile.db');

export function initProfileDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY NOT NULL,
      fullname TEXT,
      phone TEXT,
      email TEXT,
      gender TEXT,
      nationality TEXT
    );
  `);

  // Migrate older database schemas if columns are missing
  try {
    db.execSync('ALTER TABLE profile ADD COLUMN gender TEXT;');
  } catch {
    // Column already exists
  }

  try {
    db.execSync('ALTER TABLE profile ADD COLUMN nationality TEXT;');
  } catch {
    // Column already exists
  }
}

export function getProfile(): { fullname: string; phone: string; email: string; gender: string; nationality: string } | null {
  const row = db.getFirstSync<{ fullname: string; phone: string; email: string; gender: string; nationality: string }>(
    'SELECT fullname, phone, email, gender, nationality FROM profile WHERE id = 1'
  );
  return row ?? null;
}

export function upsertProfile(fullname: string, phone: string, email: string, gender: string, nationality: string) {
  db.runSync(
    `INSERT INTO profile (id, fullname, phone, email, gender, nationality) VALUES (1, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET fullname=excluded.fullname, phone=excluded.phone, email=excluded.email, gender=excluded.gender, nationality=excluded.nationality`,
    fullname, phone, email, gender, nationality
  );
}
