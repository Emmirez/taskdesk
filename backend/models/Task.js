// models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    title: {
      type:      String,
      required:  [true, "Title is required"],
      trim:      true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    status: {
      type:    String,
      enum:    ["todo", "inprogress", "completed"],
      default: "todo",
    },
    priority: {
      type:    String,
      enum:    ["low", "medium", "high"],
      default: "medium",
    },
    due: {
      type: String,
      default: "",
    },
    project: {
      type:    String,
      default: "",
      trim:    true,
    },
    notes: {
      type:    String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);