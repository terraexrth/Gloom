import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, ProjectDetail } from "./page";
import { createTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { authMe } from "./service/user";
import { Badge } from "@mui/material";
import { getInvite, getNotification } from "./service/invite";
import NotificationsComponent from "./component/Notification/Notification";

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

  //   useEffect(() => {
  // 	if(isAuth){
  // 		const eventSource = new EventSource(`http://localhost:8181/api/invite/notification?userId=${isAuth.id}`);
  // 		eventSource.onmessage = (event) => {
  // 		  const newNotifications = JSON.parse(event.data);
  // 		  setNotification(newNotifications);
  // 		};

  // 		return () => {
  // 		  eventSource.close();
  // 		};

  // 	}
  //   },[isAuth])

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <div className="App">
        {isAuth && <NotificationsComponent isAuth={isAuth} />}

        <Routes>
          <Route path="/" element={isAuth ? <Dashboard /> : <Login />}></Route>
          <Route
            path="/project/:id"
            element={isAuth ? <ProjectDetail /> : <Login />}
          ></Route>
          {/* <Route path="/" element={<Dashboard />}></Route> */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
