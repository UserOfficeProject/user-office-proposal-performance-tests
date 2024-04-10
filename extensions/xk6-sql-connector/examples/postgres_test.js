import sql from 'k6/x/sql';

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open('postgres', '');

export function setup() {
  db.exec(`CREATE TABLE IF NOT EXISTS extension (
    id SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    definition varchar(50)
  )`);
}

export function teardown() {
  db.close();
}

export default function () {
  db.exec("INSERT INTO extension(name, definition) VALUES('connector name', 'sql-connector');");
  let results = sql.query(db, 'SELECT * FROM extension WHERE definition = $1;', 'sql-connector');
  for (const row of results) {
    console.log(`name: ${row.name}, definition: ${row.definition}`);
  }
}