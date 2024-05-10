const {default: mongoose} = require("mongoose");

const InviteSchema = new mongoose.Schema({
	invitedBy : {type:mongoose.Schema.Types.ObjectId ,ref: "User",required: true},
	inviteTo : {type:mongoose.Schema.Types.ObjectId ,ref: "User",required: true},
	projectId :{type:mongoose.Schema.Types.ObjectId ,ref: "Project",required: true},

},{versionKey:false});

const Invite = mongoose.model("Invite",InviteSchema);

module.exports = Invite;
