import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "./Accordian.css";
import { getUserByTag } from "../../service/user";

const MemberAccord = () => {
  const [searchId, setSearchId] = useState("");

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
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

console.log(searchId)
  return (
    <div style={{ marginTop: 20 }}>
      <Accordion
        expanded={true}
        square="false"
        sx={{ width: { xs: "80vw", md: "60vw" }, borderRadius: 3 }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <p>สมาชิก</p>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem className="member_list_find">
              <OutlinedInput
                defaultValue={""}
                fullWidth
                placeholder="ค้นหาสมาชิกด้วยไอดี เช่น (#AB12345) "
                onChange={handleInputChange}
                startAdornment={<SearchIcon sx={{ opacity: "0.5" }} />}
              />
			  <Button onClick={onUserSearch}>
				Search
			  </Button>
            </ListItem>
            <ListItem className="add_task_list" sx={{ cursor: "pointer" }}>
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

export default MemberAccord;
