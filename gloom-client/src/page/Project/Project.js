import React, { useEffect, useState } from "react";
import { getProjectById } from "../../service/project";
import { useParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";

import "./Project.css";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { authMe, getUserById } from "../../service/user";
import { stringToColour } from "../../global/global.config";
import TaskAccordian from "../../component/Accordian/TaskAccordian";
import { addTask } from "../../service/task";
import MemberAccord from "../../component/Accordian/MemberAccord";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState([]);

  const onAuthMe = async () => {
    const response = await authMe();
    setAuth(response);
  };

  const onGetProject = async () => {
    try {
      const response = await getProjectById(id, auth.id);
      setProject(response);
    } catch (e) {
      console.error(e);
    }
  };

  const onGetUser = async () => {
    try {
      const userData = await getUserById(project.userCreated);
      setUser(userData.username);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onAuthMe();
  }, []);

  useEffect(() => {
    onGetProject();
  }, [auth]);

  useEffect(() => {
    if (project && project.userCreated) {
      onGetUser();
    }
    document.title = `Gloom | ${project.projectName}`;
  }, [project]);

  return (
    <div className="project_container">
      <Sidebar />
      <div className="project_content">
        <Box className="p_box" marginBottom={3}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <div className="header_project">
                <Stack
                  className="header_content"
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: { xs: "flex-start", md: "space-between" },
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                  display={"flex"}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 24, md: 30 },
                      marginBottom: { md: 2 },
                    }}
                    textAlign={"left"}
                  >
                    {project.projectName}
                  </Typography>
                  <Stack direction={"row"}>
                    <Avatar
                      sx={{
                        width: 24,
                        bgcolor: stringToColour(user),
                        height: 24,
                      }}
                    >
                      {user.charAt(0)}
                    </Avatar>
                    <Typography>{user}</Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="body1"
                  color={"rgba(0,0,0,0.5)"}
                  textAlign={"left"}
                >
                  รายละเอียด
                </Typography>
                <Typography variant="body1" textAlign={"left"}>
                  {project.projectDesc}
                  {user.username}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>

        <TaskAccordian project={project} />
		<MemberAccord/>
      </div>
    </div>
  );
};

export default Project;
