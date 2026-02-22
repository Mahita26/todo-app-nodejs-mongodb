const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("My Express + SQLite server is running!");
});

// GET all tasks from database
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// POST new task to database
app.post("/tasks", (req, res) => {
    const { task } = req.body;

    db.run("INSERT INTO tasks (task) VALUES (?)", [task], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, task });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});