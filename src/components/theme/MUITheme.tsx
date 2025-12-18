import { createTheme } from "@mui/material/styles";

export function getMuiTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: { default: "#121212", paper: "#1E1E1E" },
            text: { primary: "#ffffff", secondary: "#bbbbbb" },
          }
        : {
            background: { default: "#ffffff", paper: "#f5f5f5" },
            text: { primary: "#000000", secondary: "#333333" },
          }),
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === "dark" ? "#fff" : "#000",
            },
            '& input': {
              color: mode === "dark" ? "#fff" : "#000",
            },
            '& .MuiInputLabel-root': {
              color: mode === "dark" ? "#fff" : "#000",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1E1E1E" : "#fff",
          },
        },
      },
      // Add other MUI components here...
    },
  });
}
