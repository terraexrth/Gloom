const Invite = require("../model/Invite");

exports.sendInvite = async (req, res) => {
  const { invitedBy, inviteTo, projectId } = req.body;

  try {
    const existingInvite = await Invite.findOne({ inviteTo, projectId });
    if (existingInvite) {
      console.log("invite already exists");
      return res.status(400).json({ message: "Invite already exists" });
    }
	
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

exports.getInvite = async (req, res) => {
	  const userId = req.query.userId;

	  console.log("userId:", userId)
  try {
	const invites = await Invite.find({ inviteTo: userId })
	if (!invites) {
	  return res.status(404).json({ message: "No invites found" });
	}

	res.status(200).json(invites);
  } catch (error) {
	console.error("Error fetching invites:", error);
	res.status(500).json({ message: "Failed to fetch invites" });
  } 
}
