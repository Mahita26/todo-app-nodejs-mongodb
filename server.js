const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("My Express server is running!");
});

// Tasks route (NEW API)
app.get("/tasks", (req, res) => {
    const tasks = [
        { id: 1, task: "Learn Node.js" },
        { id: 2, task: "Build ToDo App" },
        { id: 3, task: "Push code to GitHub" }
    ];

    res.json(tasks);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});