import React, { useState } from "react";
import "./CreateModal.css";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { deleteProject } from "../../service/project";
import toast from "react-hot-toast";
const DeleteProjectModal = (props) => {
  const {
    project,
    setDeleteModalOpen,
    onGetAllProject,
    handleCloseDeleteModal,
  } = props;
  const [pName, setpName] = useState("");

  const handleInputChange = async (event) => {
    setpName(event.target.value);
  };

  const handleSubmit = async () => {
    if (pName === project.projectName) {
      await deleteProject(project.id, pName);
      onGetAllProject();
      toast.success("ลบโครงงานสำเร็จ");

      handleCloseDeleteModal();
    } else {
      toast.error("ชื่อโครงงานไม่ตรงกับที่ระบุ");
    }
  };

  console.log(pName);

  return (
    <div className="modal_container">
      <div className="modal_wrapped">
        <div className="modal_del_card">
          <Stack  sx={{width:'80%'}} justifyContent={"center"} alignItems={"center"}>
            <Stack
              display={"flex"}
              
            >
              <Typography variant="body1" color="initial">
                ท่านแน่ใจหรือไม่ที่ต้องการลบ{" "}
                <span style={{ fontWeight: "bold" }}>
                  "{project.projectName}"
                </span>
              </Typography>
            </Stack>

            <TextField
              id="projectName"
              value={pName}
              onChange={handleInputChange}
              sx={{  marginTop: "10px" }}
              label="กรุณากรอกชื่อโครงงานเพื่อยืนยันการลบ"
			  fullWidth
            ></TextField>
            <Stack direction={"row"} spacing={5} marginTop={3}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleCloseDeleteModal()}
              >
                ยกเลิก
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                ยืนยัน
              </Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
