// controllers/taskController.js
import Task from "../models/Task.js";

// @route  GET /api/tasks
// @access Private
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

// @route  POST /api/tasks
// @access Private
export const createTask = async (req, res, next) => {
  try {
    const { title, status, priority, due, project, notes } = req.body;
    if (!title?.trim()) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    const task = await Task.create({
      user: req.user.id,
      title, status, priority, due, project, notes,
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

// @route  PUT /api/tasks/:id
// @access Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    const { title, status, priority, due, project, notes } = req.body;
    if (title !== undefined) task.title    = title;
    if (status !== undefined) task.status  = status;
    if (priority !== undefined) task.priority = priority;
    if (due !== undefined) task.due        = due;
    if (project !== undefined) task.project = project;
    if (notes !== undefined) task.notes    = notes;
    await task.save();
    res.status(200).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

// @route  DELETE /api/tasks/:id
// @access Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};