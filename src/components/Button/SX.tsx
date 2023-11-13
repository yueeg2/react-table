
export const SX = {
  IconButton: (value?: boolean, variant?: string, buttonColor?: string, radius?: boolean, padding? : string) => {
    return ({
      ':hover': {
        '& span': {
          color: variant
            ? `var(--white) !important`
            : 'inherit',
        },
        transition: 'none',      
      },
      '& span': {
        fontSize: 16,
        textTransform: 'capitalize',
        color: variant
          ? (value ? `var(--white) !important` : `${buttonColor} !important`)
          : 'var(--white) !important',
        ':hover': {
          color: variant
            ? `var(--white) !important`
            : 'inherit',
        }
      },
      width: '100%',
      minWidth: 'fit-content',
      padding: padding ? padding : '0 9px',
      borderRadius: radius ? 20 : 1,
      border: variant ? 1 : 0,
      borderColor: radius ? 'transparent' : buttonColor,
      backgroundColor: variant
        ? (value ? buttonColor : 'inherit')
        : (value ? 'var(--gray-light)' : buttonColor ? buttonColor : 'default')
    });
  },
  ButtonGroup: ({ text, position, buttonColor }: { text: string, position: number, buttonColor: string }) => {
    return ({
      '& span': {
        fontSize: 20,
        paddingInline: 0.6,
        textTransform: 'capitalize',
        color: `var(--white) !important`,

      },
      ':hover': {
        filter: 'brightness(var(--hover-brightness)) !important',
        backgroundColor: buttonColor
      },
      position: 'relative',
      left: position > 1 ? position > 2 ? 80 : 40 : 0,
      minWidth: 190,
      paddingBlock: 3.5,
      paddingInline: 2,
      borderRadius: '50px 0 0 50px',
      borderColor: buttonColor,
      boxShadow: '0 0 11px 0 rgba(0, 0, 0, 0.5)',
      backgroundColor: buttonColor
    })
  }
};
