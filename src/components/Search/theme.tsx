import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          maxWidth: 300,
          minHeight: 40,
          boxShadow: 'none !important',
          border: 'solid 1px #cecece',
          display: 'flex',
          alignItems: 'center',
          margin: '0px 0px 8px 0px'
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: 270,
          fontSize: 14,
          padding: '0 10px',
        },
      },
    }
  },
});
