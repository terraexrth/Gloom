import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, InputAdornment } from "@mui/material";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { postLogin } from "../../service/user";

const Login = () => {
  const [request, setRequest] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
	setRequest((prevData)=>({
		...prevData,
		[name]:value,
	}))
  };

  const userLogin = async () => {
	
	if(request.username ===""||request.password===""){
		toast.error("กรุณากรอกข้อมูลให้ถูกต้อง")
	}
	try{
		const response = await postLogin(request);
		Cookies.set("accessToken", response.accessToken)
		window.location.href ="/";
	}catch(e){
		if(e.response.status === 401){
			toast.error("ชื่อบัญชีหรือรหัสผ่านไม่ถูกต้อง")
		}
	}
  }
  return (
    <div className="container">
      <div className="login_card_wrapped">
        <div className="login_card">
          <div className="logo_image"></div>
          <div className="form_wrapped">
            <TextField
              id="username"
			  name="username"
              label="ชื่อบัญชีผู้ใช้งาน"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "70%", marginBottom: 3 }}
			  onChange={handleInputChange}
            />
            <TextField
              id="password"
			  name="password"
              label="รหัสผ่าน"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "70%" }}
			  onChange={handleInputChange}
            />
          </div>
          <Button onClick={userLogin}>เข้าสู่ระบบ</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
