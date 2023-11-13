
import { StylesConfig } from 'react-select';

export const SingleStyles
  = (sx?: any, isVisible?: boolean): StylesConfig => ({
    valueContainer: (styles: any) => ({
      ...styles,
      display: isVisible ? 'block' : 'none',
      width: sx?.width ? sx?.width : 200,
      height: '25px',
      padding: sx?.width ? 0 : styles.padding,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      fontSize: 'var(--fz-m)',
      alignItems: 'center',
      display: 'flex !important',
      height: '20px',
      margin: sx?.margin ? sx?.margin : '0 2px 0 2px'
    }),
    container: (styles: any) => ({
      ...styles,
      width: 'auto',
      //height: '25px'
    }),
    placeholder: (styles: any) => ({
      ...styles,
      height: 'inherit',
      fontWeight: 'var(--fw-m)'
    }),
    indicatorsContainer: (styles: any) => ({
      ...styles,
      minHeight: sx?.minH ? sx?.minH : '25px',
    }),
    control: (styles: any) => ({
      ...styles,
      cursor: 'pointer',
      borderRadius: "5px",
      borderStyle: sx?.border ? 'none' : 'solid',
      border: sx?.border ? sx?.border : '1px solid #aaaaaa',
      backgroundColor: sx?.controlBC ? sx?.controlBC : "var(--white)",
      minHeight: sx?.minH ? sx?.minH : '25px',
      fontSize: "var(--fz-s)",
    }),
    menu: (styles: any) => ({
      ...styles,
      fontSize: "var(--fz-s)",
      zIndex: 3100,
    }),
    input: (styles: any) => ({
      ...styles,
      height: 25,
      padding: 0,
      margin: 0,
    }),
    indicatorSeparator: () => ({
      width: '0px'
    })
  })

export const MultiStyles: StylesConfig
  = {
  container: (styles: any) => ({
    ...styles,
    width: 'auto',
    height: '25px'
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    width: '200px',
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    height: '25px'
  }),
  placeholder: (styles: any) => ({
    ...styles,
    height: '25px'
  }),
  control: (styles: any) => ({
    ...styles,
    cursor: 'pointer',
    borderRadius: "5px",
    border: '1px solid #aaaaaa',
    backgroundColor: "var(--white)",
    minHeight: '25px',
    fontSize: "var(--fz-s)",
  }),
  menu: (styles: any) => ({
    ...styles,
    fontSize: "var(--fz-s)",
  }),
  input: (styles: any) => ({
    ...styles,
    height: '25px',
  }),
  multiValue: (styles: any) => ({
    ...styles,
    borderRadius: '13px',
    height: '24px',
    backgroundColor: 'var(--mediumGreenColor)',
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: "var(--white)",
    margin: "2px 0",
    padding: '0 10px !important',
    fontSize: "var(--fz-xs)",
    fontWeight: "var(--fw-l)",
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: "var(--white)",
    padding: '2px !important',
    margin: "4px",
    ' svg': {
      width: "15px",
      height: "15px",
    },
    ':hover': {
      backgroundColor: "var(--mediumGreenColor)",
      color: "var(--mediumGreenColor)",
      borderRadius: "20px",
    },
  }),
  indicatorSeparator: () => ({
    width: '0px'
  })
}
export const GroupedStyles
  = (style?: any): StylesConfig => ({
    container: (styles: any) => ({

      zIndex: 3,
      minWidth: 300,
      maxWidth: 300,
      ...style,
      ...styles,

    }),
    control: (styles: any) => ({
      ...styles,
      cursor: 'pointer',
      maxHeight: 40,
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      maxHeight: 35,
      // overflow: 'overlay'
    }),
    // multiValueRemove: (styles, { isDisabled }:any) => ({
    //   ...styles,
    //   cursor: isDisabled ? 'not-allowed' : 'pointer',
    // }),
    menu: (styles: any) => ({
      ...styles,
      zIndex: 3100,
      overflowX: 'none',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        fontWeight: data.value.includes('_SELECT_ALL') ? '700' : '400',
        borderBlockStyle: 'solid',
        borderBlockWidth: data.value.includes('_SELECT_ALL') ? 1 : 0,
        borderBlockColor: '#f2f2f2',
        backgroundColor: isDisabled
          ? undefined
          : data.value.includes('_SELECT_ALL') ? 'rgba(25, 118, 210, 0.00)' : isSelected
            ? '#cceaee'
            : isFocused
              ? 'rgba(25, 118, 210, 0.06)'
              : undefined,
        color: isDisabled
          ? '#ccc'
          : 'black',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'rgba(25, 118, 210, 0.06)'
              : 'rgba(25, 118, 210, 0.06)'
            : undefined,
        },
        padding: '0px 12px',
        marginInlineEnd: 18,
        width: `calc(${style?.minWidth ? style?.minWidth : '300px'} - 42px)`
      };
    },

    menuList: (base: any) => ({
      ...base,

      "::-webkit-scrollbar": {
        dispaly: 'none',
        width: 0,
        height: 0,

      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "transparent"
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent"
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "transparent"
      }
    })
  });
