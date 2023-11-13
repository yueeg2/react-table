import { Theme, createTheme } from "@mui/material";
import { TableRowStyleProps } from "@/components/Table/table.d";

function TableRowTheme(style?: TableRowStyleProps): Theme {
  if (!style) {
    return createTheme({});
  }
  const { padding, color, backgroundColor, ...other } = style;
  return createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            ...other,
            padding: padding,
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            alignItems: 'center',
            ':nth-of-type(even)': {
              backgroundColor: '#fff',
            },
            ':nth-of-type(odd)': {
              backgroundColor: backgroundColor,
              ':hover': {
                backgroundColor: `${backgroundColor} !important`,
              }
            },
            ':hover': {
              backgroundColor: '#fff !important',
            }
          }
        }
      }
    },
  });
}


export default TableRowTheme