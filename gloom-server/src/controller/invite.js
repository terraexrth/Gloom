const Invite = require("../model/Invite");

const { Project } = require("../model/Task");
const  User  = require("../model/User");

exports.sendInvite = async (req, res) => {
  const { invitedBy, inviteTo, projectId } = req.body;

  try {
    const existingInvite = await Invite.findOne({ inviteTo, projectId });
    if (existingInvite) {
      console.log("invite already exists");
      return res.status(400).json({ message: "Invite already exists" });
    }

    const newInvite = new Invite({
      invitedBy,
      inviteTo,
      projectId,
      createdAt: new Date(),
    });
    const savedInvite = await newInvite.save();

    if (!savedInvite) {
      return res.status(500).json({ message: "Failed to send invite" });
    }

    res.status(201).json(savedInvite);
  } catch (error) {
    console.error("Error sending invite:", error);
    res.status(500).json({ message: "Failed to send invite" });
  }
};

exports.getInvite = async (req, res) => {
  const userId = req.query.userId;

  console.log("userId:", userId);
  try {
    const invites = await Invite.find({ inviteTo: userId });
    if (!invites) {
      return res.status(404).json({ message: "No invites found" });
    }

    res.status(200).json(invites);
  } catch (error) {
    console.error("Error fetching invites:", error);
    res.status(500).json({ message: "Failed to fetch invites" });
  }
};

exports.notification = async (req, res) => {
  const userId = req.query.userId;

  if (!userId || userId === "undefined" || userId === "null") {
    return res.status(400).json({ message: "userId is required" });
  }
  console.log(userId);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendNotification = async () => {
    const invites = await Invite.find({ inviteTo: userId, status: "pending" });
    res.write(`data: ${JSON.stringify(invites)}\n\n`);
  };

  const interval = setInterval(() => {
    sendNotification();
  }, 5000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
};

exports.updateInvite = async (req, res) => {
	const { inviteId, status } = req.body;
	try {
	  const updatedInvite = await Invite.findByIdAndUpdate(
		inviteId,
		{ status },
		{ new: true }
	  );
	  if (!updatedInvite) {
		return res.status(404).json({ message: "Invite not found" });
	  }
  
	  if (status === "accept") {
		const project = await Project.findById(updatedInvite.projectId);
		if (!project) {
		  return res.status(404).json({ message: "Project not found" });
		}
		if (!project.members) {
		  project.members = [];
		}
		project.members.push(updatedInvite.inviteTo);
		await project.save();
  
		// Update the membered field in the User schema
		await User.findByIdAndUpdate(
		  updatedInvite.inviteTo,
		  { $push: { "projects.membered": updatedInvite.projectId } },
		  { new: true }
		);
	  }
  
	  res.status(200).json(updatedInvite);
	} catch (e) {
	  console.error(e);
	  res.status(500).json({ message: "Failed to update invite" });
	}
  };

exports.getMember = async (req, res) => {
  const { projectId } = req.query;
  try {
    const invite = await Invite.find({
      projectId,
    }).select("inviteTo to status");
    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }
    res.status(200).json(invite);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch invite" });
  }
};
