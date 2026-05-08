const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const { title, dueDate } = req.body; // ✅ added dueDate

        const task = await Task.create({
            title,
            dueDate, // ✅ store due date
            user: req.user.id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL TASKS (ONLY USER'S TASKS)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).sort({ createdAt: -1 }); // ✅ newest first (optional but better)

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE TASK STATUS
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        task.status = "Completed";

        await task.save();

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};