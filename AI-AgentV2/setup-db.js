const sqlite3 = require("sqlite3").verbose();

// Create database
const db = new sqlite3.Database("mydb.sqlite");

// Create table and insert data
db.serialize(() => {
  db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
    )`);

  db.run(
    `INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')`
  );
  db.run(
    `INSERT INTO users (name, email) VALUES ('Jane Smith', 'jane@example.com')`
  );
  db.run(
    `INSERT INTO users (name, email) VALUES ('Bob Johnson', 'bob@example.com')`
  );
});

db.close();
console.log("Database created successfully!");
