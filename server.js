const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static("public"));

// Allow JSON body
app.use(express.json());

// GET all tasks
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// POST new task
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

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Task deleted" });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});