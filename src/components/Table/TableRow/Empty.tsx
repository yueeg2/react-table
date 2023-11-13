import {
  createTheme,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";


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
                //backgroundColor: `${backgroundColor} !important`,
              }
            },
            ':hover': {
              backgroundColor: '#fff !important',
              //cursor: 'pointer'
            }
          }
        }
      }
    },
  });
}



export const Empty = ({ style }: any) => {
  return <ThemeProvider
    theme={BaseTheme(style)}>
    <MuiTableRow hover role="checkbox"
      tabIndex={-1} key={'empty-TableRow'}
      data-testid={'empty-TableRow'}>
      <TableCell
        align={'center'}
        key={'empty-TableCell'}>
        
      </TableCell>
    </MuiTableRow>
  </ThemeProvider>
}