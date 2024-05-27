import {
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,

} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./CardProject.css";
import { getUserById } from "../../../service/user";
import { stringToColour, useHorizontalScroll } from "../../../global/global.config";
import {Link} from 'react-router-dom'
import CreateProjectCard from "../ProjectCreate/CreateProjectCard";

const CardProject = (props) => {
  const { request,handleModalOpen } = props;

  const [projects, setProjects] = useState([]);
  const [ownProject, setOwnProject] = useState([]);
  const [memberProject, setMemberProject] = useState([]);
  const ownScroll = useRef(null);
  const  memberScroll = useRef(null);

  const handleSetProjects = async () => {
    if (!request) {
      return console.log("fetch data error");
    }
    setProjects(request);
  };

  const getOwnProject = async () => {
    try {
      const own = [];
      for (const project of projects.own) {
        const user = await getUserById(project.userCreated);
        own.push({
			id:project.id,
          projectName: project.projectName,
          projectDesc: project.projectDesc,
          creatorName: user.username,
        });
      }
      setOwnProject(own);
    } catch (e) {
      console.error(e);
    }
  };

  const getMemberProject = async () => {
    try {
      const member = [];
      for (const project of projects.membered) {
        const user = await getUserById(project.userCreated);
        member.push({
          id: project.id,
          projectName: project.projectName,
          projectDesc: project.projectDesc,
          creatorName: user.username,
        });
      }
      setMemberProject(member);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleSetProjects();
  }, [request]);

  useEffect(() => {
    if (projects && projects.own) {
      getOwnProject();
    }
    if (projects && projects.membered) {
      getMemberProject();
    }
  }, [projects]);

  
  useHorizontalScroll(ownScroll)
  useHorizontalScroll(memberScroll)

  return (
    <div className="card_p_container">
      <Chip  color="primary" label="My Project" sx={{width:120,height:40,borderRadius:100,fontWeight:'bold',fontSize:16}} />
      <div className="own_project_container"  ref={ownScroll}>
		
        <div className="card_row">
			
          {ownProject.length > 0 && 
            ownProject.map((project, index) => (
				
				<Link to={`/project/${project.id}`} >
              <Box
                className="card_p_wrapped"
                key={index}
                sx={{ width: 300, margin: 2 }}
              >
                <Card className="real_card" variant="outlined" sx={{ borderRadius: 3, height: 200 }}>
                  <CardContent>
                    <Typography
                      textAlign={"left"}
                      sx={{ fontWeight: "bold" }}
                      color="initial"
                    >
                      {project.projectName}
                    </Typography>
                    <Typography textAlign={"left"} color="initial">
                      สิ้นสุดใน 1 วัน 12 ชั่วโมง 31 นาที{" "}
                    </Typography>
                    <Stack direction={"row"}>
                      <Avatar
                        sx={{
                          width: 24,
                          bgcolor: stringToColour(project.creatorName),
                          height: 24,
                        }}
                      >
                        {project.creatorName.charAt(0)}
                      </Avatar>
                      <Typography variant="body1" color="initial">
                        {project.creatorName}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
			  </Link>
            ))
         }
        </div>
		<CreateProjectCard handleModalOpen={handleModalOpen}/>
      </div>
	  
      <Chip sx={{background:'#1e88e5',color:'white'}} label="Participate" />

      <div style={{ marginTop: 5 }} className="member_project_containet" ref={memberScroll}>
        <div className="card_row">
          {memberProject.length > 0 ? (
            memberProject.map((project, index) => (
              <Box
                className="card_p_wrapped"
                key={index}
                sx={{ width: 300, margin: 2 }}
              >
                <Card variant="outlined" sx={{ borderRadius: 3, height: 200 }}>
                  <CardContent>
                    <Typography
                      textAlign={"left"}
                      sx={{ fontWeight: "bold" }}
                      color="initial"
                    >
                      {project.projectName}
                    </Typography>
                    <Typography textAlign={"left"} color="initial">
                      สิ้นสุดใน 1 วัน 12 ชั่วโมง 31 นาที{" "}
                    </Typography>
                    <Stack direction={"row"}>
                      <Avatar
                        sx={{
                          width: 24,
                          bgcolor: stringToColour(project.creatorName),
                          height: 24,
                        }}
                      >
                        {project.creatorName.charAt(0)}
                      </Avatar>
                      <Typography variant="body1" color="initial">
                        {project.creatorName}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
