import React, { useEffect, useState } from "react";
import { authMe } from "../../service/user";
import { subscribeToNotifications } from "../../service/invite";
import { Badge, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotiModal from "../Modal/NotiModal";

const NotificationsComponent = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);
  const { isAuth } = props;

  const handleOpenNoti = () => {
    setOpenNoti(!openNoti);
  };

  useEffect(() => {
    if (!isAuth) return;
    const userId = isAuth.id;
    const unsubscribe = subscribeToNotifications(userId, setNotifications);

    return () => {
      unsubscribe();
    };
  }, [isAuth]);

  

  return (
    <div
      className="notification"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
		marginBottom={2}
        sx={{ width: "100%" }}
      >
        <Badge
          className="notification-badge"
          sx={{ cursor: "pointer" }}
          badgeContent={notifications.length}
          color="error"
          onClick={handleOpenNoti}
        >
          <NotificationsIcon color="action" />
        </Badge>
      </Stack>

      {openNoti && notifications.length>0 && <NotiModal notifications={notifications} />}
    </div>
  );
};

export default NotificationsComponent;
