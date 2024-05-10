const express = require('express')
const router = express.Router();
const projectController = require('../controller/project');
const { verifyAccessToken } = require('../middleware/auth');

router.post('/addProjects',verifyAccessToken,projectController.createProject)
router.get('/projects',verifyAccessToken,projectController.getProject)
router.get('/project/:id',verifyAccessToken,projectController.getProjectById)
router.get('/project/user/:id',verifyAccessToken,projectController.getUserProject)
router.delete('/project/:id/:name',verifyAccessToken,projectController.deleteProject)
router.get('/project/task/:id',verifyAccessToken,projectController.getTaskInProject)

module.exports = router;
