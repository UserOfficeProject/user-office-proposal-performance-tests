import sql from 'k6/x/sql';

// The second argument is a Oracle connection string, e.g.
// `user="myuser" password="mypass" connectString="127.0.0.1:1521/mydb"`
const db = sql.open('oracle', '');

export function setup() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS extension (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(50) NOT NULL,
      definition VARCHAR(50) NULL
    );
  `);
}

export function teardown() {
  db.close();
}

export default function () {
  db.exec("INSERT INTO extension (`name`, definition) VALUES('connector name', 'sql-connector');");

  let results = sql.query(db, "SELECT * FROM extension WHERE `definition` = :1", 'sql-connector');
  for (const row of results) {
    // Convert array of ASCII integers into strings. See https://github.com/grafana/xk6-sql/issues/12
    console.log(`name: ${String.fromCharCode(...row.name)}, definition: ${String.fromCharCode(...row.definition)}`);
  }
}