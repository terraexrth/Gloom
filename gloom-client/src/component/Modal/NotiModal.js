import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getInvite, updateInvite } from "../../service/invite";
import { getUserById } from "../../service/user";
import { getProjectById } from "../../service/project";

const NotiModal = (props) => {
  const { notifications } = props;
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState({});

  const onUpdateInvite = async (inviteId, status) => {
    try {
      await updateInvite(inviteId, status);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchUsersAndProjects = async () => {
      const fetchedUsers = await Promise.all(
        notifications.map((notification) => getUserById(notification.invitedBy))
      );
      const fetchedProjects = await Promise.all(
        notifications.map((notification) =>
          getProjectById(notification.projectId)
        )
      );
      setUsers(fetchedUsers);
      setProjects(fetchedProjects);
    };

    fetchUsersAndProjects();
  }, [notifications]);

  return (
    <Stack
      sx={{
        width: "30vw",
        height: "40vh",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <List disablePadding sx={{ width: "100%" }}>
        {users.map((user, index) => (
          <ListItem
            disablePadding
            key={index}
            sx={{
              width: "100%",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              marginBottom: 2,
            }}
          >
            <Stack direction={"column"}>
              <Typography fontSize={18} color={"black"} fontWeight={"bold"}>
                {user.username}
              </Typography>
              <Stack direction={"row"} marginTop={1}>
                <Typography marginRight={1} color={"black"}>
                  ได้เชิญคุณให้เข้าร่วมในงาน
                </Typography>
                <Typography color={"black"} fontWeight={"bold"}>
                  {projects[index].projectName}
                </Typography>
              </Stack>
              <Stack
                marginTop={1}
                marginBottom={1}
                width={"7vw"}
                direction={"row"}
                display={"flex"}
                justifyContent={"space-around"}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    updateInvite({
                      inviteId: notifications[index].id,
                      status: "accept",
                    })
                  }
                >
                  เข้าร่วม
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    updateInvite({
                      inviteId: notifications[index].id,
                      status: "decline",
                    })
                  }
                >
                  ปฏิเสธ
                </Button>
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default NotiModal;
