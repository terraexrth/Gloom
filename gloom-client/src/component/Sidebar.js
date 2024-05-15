import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Cookies from "js-cookie";
import { Avatar, Badge, Button, Stack, Typography } from "@mui/material";
import { authMe } from "../service/user";
import { stringToColour } from "../global/global.config";
import { Link } from "react-router-dom";
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
      <div className="sidebar_menu">
        <div className="menu_item">
          <Link to="/">
            <Button sx={{ color: "white" }}>Dashboard</Button>
          </Link>
        </div>
        <div className="menu_item">
          <Link to="/notification">
            <Badge color="error" badgeContent={5}>
              <Button sx={{ color: "white" }}>Notification</Button>
            </Badge>
          </Link>
        </div>
        <div className="menu_item">
          <Button sx={{ color: "white" }}>Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
