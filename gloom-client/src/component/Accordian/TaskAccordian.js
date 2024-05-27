import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import React, { useEffect, useState } from "react";
import "./Accordian.css";
import { addTask, getTask } from "../../service/task";
import toast from "react-hot-toast";

const TaskAccordian = (props) => {
  const { project } = props;
  const [task, setTask] = useState([]);
  const [inputField, setInputField] = useState(false);
  const [taskResponse, setTaskResponse] = useState({
    taskName: "",
    taskDescription: "",
    userCreated: "",
    enroled: "",
  });
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const onGetTask = async () => {
    try {
      if (!project.id) {
        console.error("Project ID is null or undefined");
        return;
      }
      const response = await getTask(project.id);
  
      setTask(response);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputField = () => {
    setInputField(!inputField);
  };

  const handleTaskChange = (event) => {
    const { name, value } = event.target;
    setTaskResponse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      if (taskResponse.taskName === "") {
        return toast.error("กรุณากรอกชื่อ Task");
      }

      await addTask(project.id, taskResponse);
      setTaskResponse({
        taskName: "",
        taskDescription: "",
        userCreated: "",
        enroled: "",
      });
      toast.success("เพิ่ม Task สำเร็จ");
      onGetTask();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onGetTask();
  }, [project]);

  return (
    <div>
      <Accordion
        expanded={expanded}
        square="false"
        sx={{ width: { xs: "80vw", md: "60vw" }, borderRadius: 3 }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />} onClick={handleAccordionChange}>
          <Typography fontSize={18}>ภาระงาน</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {task.map((taskItem) => (
              <ListItem className="task_list" key={taskItem._id}>
                <Typography key={`${taskItem._id}-name`}>
                  {taskItem.taskName}
                </Typography>
              </ListItem>
            ))}
            {inputField && (
              <ListItem>
                <FormControl>
                  <TextField
                    id="task_name"
                    name="taskName"
                    labelid="task-label"
                    label="ภาระงาน"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: { xs: "10vw", md: "25vw" } }}
                    fullWidth
                    value={taskResponse.taskName}
                    onChange={(e) => handleTaskChange(e)}
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{ width: { xs: "5vw", md: "10vw" } }}
                >
                  <InputLabel id="incharge-label">ผู้รับผิดชอบ</InputLabel>
                  <Select
                    name="enroled"
                    value={taskResponse.enroled}
                    onChange={handleTaskChange}
                    labelid="incharge-label"
                    label="ผู้รับผิดชอบ"
                  >
                    <MenuItem value={"Ten"}>Ten</MenuItem>
                  </Select>
                </FormControl>
                <Button onClick={handleAddTask}>เพิ่ม</Button>
                <Button
                  onClick={() => {
                    handleInputField();
                  }}
                >
                  ยกเลิก
                </Button>
              </ListItem>
            )}
            <ListItem
              className="add_task_list"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                handleInputField();
              }}
            >
              <Typography
                className="buttonText"
                fontWeight={"bold"}
                color={"var(--primary-color)"}
              >
                เพิ่ม
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TaskAccordian;
