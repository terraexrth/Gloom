const { Project, Task } = require("../model/Task");



exports.createTaskInProject = async (req, res) => {
  const { projectId } = req.params;
  const { taskName, taskDescription, userCreated, enroled } = req.body;

  try {
    // Create the new task
    const newTask = new Task({ taskName, taskDescription,userCreated, enroled});
    const savedTask = await newTask.save();

    if (!savedTask) {
      return res.status(500).json({ message: "Failed to create task" });
    }

    // Find the project by ID and update its tasks array
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Push the new task's ID into the tasks array of the project
    project.tasks.push(savedTask._id);
    await project.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task in project:", error);
    res.status(500).json({ message: "Failed to create task in project" });
  }
};

exports.updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  const { taskName, taskDescription, dueDate } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { taskName, taskDescription, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findOneAndUpdate(
      { tasks: taskId },
      { $pull: { tasks: taskId } },
      { new: true }
    );

    if (!project) {
      console.error("Project not found for task ID");
      return res
        .status(500)
        .json({ message: "Failed to delete task from project" });
    }
    res.status(200).json({ message: "Task deleted Successfully", deletedTask });
  } catch (error) {
    console.error("Error Deleting Task : ", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
