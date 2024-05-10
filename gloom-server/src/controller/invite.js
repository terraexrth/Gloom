const { Invite } = require("../model/Invite");


exports.sendInvite = async (req, res) => {
  const { invitedBy, inviteTo, projectId } = req.body;

  try {
    const newInvite = new Invite({ invitedBy, inviteTo, projectId });
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


