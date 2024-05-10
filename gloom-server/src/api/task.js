const Task = require("../model/Task");
const taskController = require('../controller/task');
const { verifyAccessToken } = require("../middleware/auth");

const router = require("express").Router();


router.post("/projects/:projectId/tasks",verifyAccessToken,taskController.createTaskInProject)

router.put("/update/:id",verifyAccessToken,taskController.updateTaskById)

router.delete('/delete/:id',verifyAccessToken,taskController.deleteTaskById) 

module.exports = router;
