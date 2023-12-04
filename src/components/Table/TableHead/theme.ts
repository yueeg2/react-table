import { CSSObject, Theme, createTheme } from '@mui/material';

export function StyledTHTheme(style?: undefined | CSSObject): Theme {
  if (!style) {
    return createTheme({})
  }
  
  const {
    color,
    textAlign = 'center',
    position = 'relative'
  } = style

  return createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            position: position,
            textAlign: textAlign,
            ':hover::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              backgroundColor: 'rgba(16, 164, 185, 0)',
              top: 0,
              width: '100%',
              zIndex: 6,
              fontWeight: '600 !important',
            },
            ...style,
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#10a4b9 !important',
          },

          indeterminate: {
            color: '#10a4b9 !important',
          },
        },
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            color: color ? color : '#000',
          },

        }
      },
    },
  })


};