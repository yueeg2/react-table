import { CSSObject, Theme, createTheme } from '@mui/material';

export const TableHeadTheme = (style?: undefined | CSSObject): Theme => {

  const {
    color,
  } = style || {};

  return createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {

            ':hover::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 6,
              width: '100%',
              backgroundColor: 'rgba(16, 164, 185, 0)',
              fontWeight: '600 !important',
            },
            padding: '16px 4px',
            hoverEvent: 'none',
            sortLabelIcon: 'none',
            fontSize: 'var(--fz-m)',
            position: 'sticky',
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
  });


};
