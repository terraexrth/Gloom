const { default: mongoose, version } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    pfcode: { type: String, required: true },
	projects: {
		own: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
		membered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
	  },
	},
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
