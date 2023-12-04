import { TableCellProps, createTheme } from '@mui/material';
import { CustomTableRowStyle } from './TableRow';


export const StyledTableCellProps = (index: number): TableCellProps => ({
  width: index === 1 ? 200 : 'fit-content',
  align: index === 1 ? 'left' : 'center'
})
export const StyledTableRowTheme = (style?: CustomTableRowStyle) => {
  if (!style) {
    return createTheme({})
  }
  const { padding, hover, backgroundColor, hoverHeight } = style;
  return createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
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
              backgroundColor: 'rgba(0, 0, 0, 0) !important;'
            }
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: padding,
            position: 'relative',
            ':hover': {
              backgroundColor: 'rgba(16, 164, 185, 0)',
            },
            ':hover::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: hover ? hover : 'rgba(16, 164, 185, 0.2)',
              left: 0,
              top: `-${hoverHeight.top}px`,
              height: hoverHeight.height,
              width: '100%',
              zIndex: 2,
            }
          }
        }
      }
    },
  })
};
