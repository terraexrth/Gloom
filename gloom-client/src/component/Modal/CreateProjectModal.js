import React, { useState } from "react";

import "./CreateModal.css";
import dayjs from "dayjs";
import { Button, Stack, TextField, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createProject } from "../../service/project";
import toast from "react-hot-toast";

const CreateProjectModal = (props) => {
  const { handleModalOpen, onGetAllProject, request } = props;
  const [projectResponse, setProjectResponse] = useState({
    projectName: "",
    projectDesc: "",
    startDate: dayjs(),
    dueDate: dayjs().add(1, "day"),
    userCreated: request.id,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectResponse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      projectResponse.projectName === "" ||
      projectResponse.dueDate < projectResponse.startDate
    ) {
      toast.error("กรุณากรอกข้อมูลให้ถูกต้อง");

      console.log("Wrong Input");
      return;
    } else {
      try {
        await createProject(projectResponse);
        setProjectResponse({
          projectName: "",
          projectDesc: "",
          startDate: dayjs(),
          dueDate: dayjs().add(1, "day"),
        });
        onGetAllProject();
        toast.success("เพิ่มโครงงานสำเร็จ");

        handleModalOpen();

        console.log("Success");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="modal_container">
      <div className="modal_wrapped">
        <div className="modal_card">
          <Stack
            display="flex"
            direction="row"
            sx={{
              alignItems: "flex-start",
              marginTop: "7px",
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"}>
              <AddBoxIcon
                sx={{
                  color: "var(--primary-color)",
                  marginLeft: "7px",
                  marginRight: "7px",
                }}
              />
              <Typography
                variant="body1"
                color="var(--primary-color)"
                sx={{ fontWeight: 500 }}
              >
                สร้างโครงงาน
              </Typography>
            </Stack>

            <DisabledByDefaultRoundedIcon
              className="exit_btn"
              sx={{
                color: "var(--negative-color)",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={handleModalOpen}
            />
          </Stack>
          <div className="modal_content">
            <Stack sx={{ width: "80%" }}>
              <TextField
                id="project_name"
                name="projectName"
                label="ชื่อโครงงาน"
                variant="outlined"
                sx={{ marginBottom: "12px" }}
                value={projectResponse.projectName}
                onChange={handleInputChange}
                fullWidth
              ></TextField>

              <TextField
                id="project_desc"
                name="projectDesc"
                label="รายละเอียด"
                variant="outlined"
                multiline
                rows={4}
                value={projectResponse.projectDesc}
                onChange={handleInputChange}
                fullWidth
              ></TextField>
            </Stack>
            <Stack direction={"column"} width={"80%"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                marginTop={2}
                spacing={1}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    sx={{ width: "22ch" }}
                    label="เวลาเริ่ม"
                    value={projectResponse.startDate}
                    onChange={(newValue) =>
                      setProjectResponse((prevData) => ({
                        ...prevData,
                        startDate: newValue,
                      }))
                    }
                    format="DD/MM/YYYY HH:mm"
                  />
                  <DateTimePicker
                    sx={{ width: "22ch" }}
                    label="เวลาส่ง"
                    value={projectResponse.dueDate}
                    onChange={(newValue) =>
                      setProjectResponse((prevData) => ({
                        ...prevData,
                        dueDate: newValue,
                      }))
                    }
                    format="DD/MM/YYYY HH:mm"
                  />
                </LocalizationProvider>
              </Stack>
              <Stack sx={{ width: "100%",marginTop:5,marginBottom:5 }}>
                <Button fullWidth variant="contained" onClick={handleSubmit}>
                  สร้าง
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
