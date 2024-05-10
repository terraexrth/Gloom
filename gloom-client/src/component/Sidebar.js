import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Cookies from "js-cookie";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { authMe } from "../service/user";
import { stringToColour } from "../global/global.config";
const Sidebar = () => {
  const [user, setUser] = useState([]);
  const [avatarName, setAvatarName] = useState("");

  const avatarTextName = async (name) => {
    const newName = Array.from(name)[0].toUpperCase();
    setAvatarName(newName);
  };

  const onAuthMe = async () => {
    try {
      const request = await authMe();
      setUser(request);
      avatarTextName(request.username);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/";
  };

  useEffect(() => {
    onAuthMe();
  }, []);

  console.log(avatarName);

  return (
    <div className="sidebar_ovr">
      <div className="sidebar_head_content">
        {user ? (
          <>
            <Avatar
              sx={{
                bgcolor: stringToColour(user.username),
                marginLeft: "10px",
              }}
            >
              {avatarName}
            </Avatar>
            <div className="nameContent">
              <Typography sx={{ color: "white", fontSize: 18 }}>
                {user.username}
              </Typography>
              <Typography sx={{ color: "white", fontSize: 14 }}>
                {user.pfcode}
              </Typography>
			  
            </div>
			
            
          </>
        ) : (
          <Typography>no user found</Typography>
        )}
      </div>
	 
    </div>
  );
};

export default Sidebar;
