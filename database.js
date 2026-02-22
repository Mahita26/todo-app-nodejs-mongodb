const sqlite3 = require("sqlite3").verbose();

// Create or connect database
const db = new sqlite3.Database("./todo.db", (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create tasks table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL
    )
`);

module.exports = db;