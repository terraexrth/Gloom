const { Project, Task } = require("../model/Task");
const User = require("../model/User");

exports.createProject = async (req, res) => {
  const { projectName, projectDesc, dueDated, userCreated } = req.body;

  try {
    const newProject = new Project({
      projectName,
      projectDesc,
      dueDated,
      userCreated,
    });
    const savedProject = await newProject.save();

    const user = await User.findById(userCreated);

    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    user.projects.own.push(savedProject._id);
    await user.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};
exports.getUserProject = async (req, res) => {
  const userId = req.user.id;
  try {
    const project = await User.findById(userId)
      .populate("projects.own")
      .populate("projects.membered");
    if (!project) {
      return res
        .status(404)
        .json({ message: "project not found on this user" });
    }
    const { projects } = project;
    res.status(200).json(projects);
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({ message: "failed to fetch project" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.find().populate("tasks");
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json(project);
  } catch (e) {
    console.error("Error : ", e);
    res.status(500).json({ message: "failed to fetch project" });
  }
};

exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.params.userId;
  try {
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }
    const project = await Project.findById(projectId).populate("tasks");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner !== userId && !project.members.includes(userId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed in server" });
  }
};

exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const nameDeleted = req.params.name;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project was not found!" });
    }

    if (nameDeleted !== project.projectName) {
      return res.status(400).json({ message: "Project Name not match!" });
    }

    const usersUpdate = await User.find({
      $or: [{ "projects.own": projectId }, { "projects.membered": projectId }],
    });

    await Promise.all(
      usersUpdate.map(async (user) => {
        user.projects.own = user.projects.own.filter(
          (id) => id.toString() !== projectId
        );
        user.projects.membered = user.projects.membered.filter(
          (id) => id.toString() !== projectId
        );

        await user.save();
      })
    );

    await Project.findByIdAndDelete(projectId);

    await Task.deleteMany({ _id: { $in: project.tasks } });

    console.log("Delete Success");

    return res.status(200).json({ message: "Project deleted successfully!" });
  } catch (e) {
    console.error(e);
  }
};

exports.getTaskInProject = async (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }
  try {
    const project = await Project.findById(projectId).populate("tasks");
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    const { tasks } = project;

    res.status(200).json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to fetch task in project" });
  }
};

exports.addMemberToProject = async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }


  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to add member to project" });
  }
};

