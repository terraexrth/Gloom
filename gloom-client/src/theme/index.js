import { createTypography } from "./createTypography";
import { createTheme as createMuiTheme } from "@mui/material";

export function createTheme() {
  const typography = createTypography();

  return createMuiTheme({
	palette: {
		primary: {
			main:'#00964e'
		}
	  },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    typography,
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-hover)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--primary-color)",
			
              },
            "& .MuiOutlinedInput-input": {
              color: "black",
            },
            "&:hover .MuiOutlinedInput-input": {
              color: "grey",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              color: "black",
            },
            "& .MuiInputLabel-outlined": {
              color: "grey",
            },
            "&:hover .MuiInputLabel-outlined": {
              color: "grey",
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "grey",
            },
          },
        },
      },
    },
  });
}
