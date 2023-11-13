import {
  createTheme,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";
import { TableRowProps } from "../table.d";


const BaseTheme = (style?: {
  padding?: string,
  color?: string,
  backgroundColor?: string,
  rowStyle?: 'box',
}) => {
  if (!style) {
    return createTheme({})
  }
  const { padding, color, backgroundColor, ...other } = style
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
            ':nth-of-type(odd)': {
              backgroundColor: '#fff',
            },
            ':nth-of-type(even)': {
              backgroundColor: backgroundColor,
              ':hover': {
                backgroundColor: `${backgroundColor} !important`,
              }
            },
            ':hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08) !important',
              cursor: 'pointer'
            }
          }
        }
      }
    },
  });
}


// export const NoHeadCell = ({ row, headCells, style }: TableRowProps) => {
//   return <ThemeProvider
//     theme={BaseTheme(style)}>
//     <MuiTableRow hover role="checkbox"
//       tabIndex={-1} key={row.value}
//       data-testid={row.value}>
//       <TableCell
//         align={'center'}
//         key={row.value}>
//         {row.label}
//       </TableCell>
//     </MuiTableRow>
//   </ThemeProvider>
// }