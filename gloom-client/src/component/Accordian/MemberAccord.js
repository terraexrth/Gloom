import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "./Accordian.css";
import { authMe, getUserById, getUserByTag } from "../../service/user";
import { stringToColour } from "../../global/global.config";
import { getMember, sendInvite } from "../../service/invite";
import { getProjectById } from "../../service/project";
import toast from "react-hot-toast";

const MemberAccord = (props) => {
  const [searchId, setSearchId] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [user, setUser] = useState([]);
  const [pending, setPending] = useState({});

  const { project } = props;
  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchProgess, setSearchProgress] = useState(false);

  const onAuthMe = async () => {
    const response = await authMe();
    setUser(response);
  };

  const handleSearch = async () => {
    setSearch(!search);
	if(searchUser){
		setSearchUser([]);
		setSearchProgress(false);
	}
  };

  const handleExpandChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^#[A-Za-z0-9]{6}$/;

    if (regex.test(inputValue)) {
      setSearchId(inputValue);
    }

    if (inputValue === "") {
      setSearchId("");
    }
  };

  const onUserSearch = async () => {
    try {
      const response = await getUserByTag(searchId);
      setSearchUser(response);
	  setSearchProgress(true);
    } catch (e) {
      console.error(e);
    }
  };

  const onSendInvite = async () => {
    const inviteRequest = {
      invitedBy: user.id,
      projectId: project.id,
      inviteTo: searchUser[0].id,
    };

    try {
      const response = await sendInvite(inviteRequest);
      console.log("Response Status:", response.status);
      if (response.status === 201) {
        onGetPending();
		setSearchUser([]);
        return toast.success("เชิญสมาชิกสำเร็จ");
      }
    } catch (e) {
      if (e.response.status === 400) {
        return toast.error("เชิญสมาชิกซ้ำ");
      } else {
        console.error(e);
      }
    }
  };

  const onGetPending = async () => {
    try {
      const response = await getMember(project.id);
      const pendingMembers = await Promise.all(
        response.map(async (member) => {
          const user = await getUserById(member.inviteTo);
          return {
            id: member.id,
            username: user.username,
            status: member.status,
          };
        })
      );
      setPending(pendingMembers);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onAuthMe();
  }, []);

  useEffect(() => {
    onGetPending();
  }, [project]);

  

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Accordion
        expanded={expanded}
        square="false"
        sx={{ width: { xs: "80vw", md: "60vw" }, borderRadius: 3 }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          onClick={handleExpandChange}
        >
          <p>สมาชิก</p>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <>
              {pending.length > 0 ? (
                pending.map((user) => (
                  <ListItem key={user._id}>
                    <Stack
                      sx={{
                        borderRadius: 2,
                        height: 60,
                        width: { xs: 500, md: "100%" },
                      }}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Avatar
                        sx={{
                          marginLeft: 1,
                          marginRight: 1,
                          bgcolor: stringToColour(user.username),
                        }}
                      >
                        {user.username[0].toUpperCase()}
                      </Avatar>
                      <div style={{ fontWeight: "bold" }}>{user.username}</div>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginLeft: "auto",
                          color:
                            user.status === "pending"
                              ? "#FF8A08"
                              : "var(--primary-color)",
                        }}
                      >
                        {user.status === "pending" ? "รอการตอบรับ" : "เข้าร่วม"}
                      </div>
                    </Stack>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <div>No pending users</div>
                </ListItem>
              )}
            </>
            {search &&searchUser && searchUser.length > 0 ? (
              <ListItem>
                <Stack
                  sx={{
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  height={60}
                  alignItems={"center"}
                  direction={"row"}
                  width={500}
                >
                  <Avatar
                    sx={{
                      bgcolor: stringToColour(searchUser[0].username),
                      marginRight: 1,
                      marginLeft: 1,
                    }}
                  >
                    {searchUser.map((user) => user.username[0].toUpperCase())}
                  </Avatar>
                  <Typography fontWeight={"bold"}>
                    {searchUser[0].username}
                  </Typography>
                  <Button
                    onClick={onSendInvite}
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: "auto", marginRight: 1 }}
                  >
                    เชิญ
                  </Button>
                </Stack>
              </ListItem>
            ) : searchProgess && search && (
              <ListItem>
                <Stack
                  sx={{ borderRadius: 2, border: "1px solid red" }}
                  height={60}
                  padding={1}
                  alignItems={"center"}
                  direction={"row"}
                  width={500}
                >
                  <Typography fontWeight={"bold"} color={"red"}>
                    X ไม่พบผู้ใช้งาน
                  </Typography>
                </Stack>
              </ListItem>
            )}
            {search && (
              <>
                <ListItem className="member_list_find">
                  <OutlinedInput
                    defaultValue={""}
                    sx={{ width: 500 }}
                    padding={1}
                    placeholder="ค้นหาสมาชิกด้วยไอดี เช่น (#AB12345) "
                    onChange={handleInputChange}
                    startAdornment={<SearchIcon sx={{ opacity: "0.5" }} />}
                    endAdornment={<Button onClick={onUserSearch}>ค้นหา</Button>}
                  />
                </ListItem>
                
              </>
            )}
			<ListItem
                  onClick={handleSearch}
                  className="add_task_list"
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    className="buttonText"
                    fontWeight={"bold"}
                    color={ search ? "var(--negative-color)": "var(--primary-color)"}
                  >
                    {search ? "ยกเลิก" : "ค้นหาสมาชิก"}
                  </Typography>
                </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MemberAccord;
