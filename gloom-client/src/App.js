import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, ProjectDetail, Notification } from "./page";
import { createTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { authMe } from "./service/user";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function App() {
  const theme = createTheme();

  const [isAuth, setIsAuth] = useState(false);

  const onAuthMe = async () => {
    try {
      const response = await authMe();
      setIsAuth(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onAuthMe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <div className="App">
        <div className="notification">
          <Badge
		  className="notification-badge"
		  sx={{cursor: "pointer"}}
            badgeContent={4}
            color="error"
          >
            <NotificationsIcon color="action" />
          </Badge>
        </div>

        <Routes>
          <Route path="/" element={isAuth ? <Dashboard /> : <Login />}></Route>
          <Route
            path="/project/:id"
            element={isAuth ? <ProjectDetail /> : <Login />}
          ></Route>
		  <Route path ="/notification" element={<Notification/>}></Route>
          {/* <Route path="/" element={<Dashboard />}></Route> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
