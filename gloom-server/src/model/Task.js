const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String },

    enroled: {type:String,required:false},
	userCreated:{type:String, require:true},
    createdDate: { type: Date, default: Date.now },
  },

  { versionKey: false }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, require: true },
    projectDesc: { type: String, require: true },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    dueDated: { type: Date },
    createdDate: { type: Date, default: Date.now },
    userCreated: { type: String, require: true },

	membered: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { Task, Project };
