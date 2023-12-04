import { TRStyleProps } from "src/utils/table.d";
import { createTheme, CSSObject, Theme } from "@mui/material";


export const THTheme = (style?: undefined | CSSObject): Theme => {

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


export function TRTheme(
  style?: TRStyleProps
): Theme {
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
};

export const CheckboxTheme = createTheme({
  components: {
    // Name of the component
    MuiCheckbox: {
      styleOverrides: {
        // Name of the slot
        // root: {
        //   // Some CSS
        //   color: '#10a4b9 !important',
        // },
        // indeterminate: {
        //   color: '#10a4b9 !important',
        // },
        root: ({ ownerState }) => ({
          ...(!ownerState.disabled ? {
            color: ownerState.checked ? 'var(--steelBlue) !important':  '#aaaaaa',
          }: {
            color: '#aaaaaa',
          }),
        }),
      },
    },
  },
});
