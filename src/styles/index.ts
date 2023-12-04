
export const StyledSX = (isBlue: boolean) => ({
  Paper: {
    minHeight: 232,
    width: '100%',
    backgroundColor: isBlue ? 'var(--blueTheme)' : '#fff',
    boxShadow: 'none',
    overflowX: 'hidden'
  },
  Topbar: { display: 'flex', justifyContent: 'space-between' },
  Footer: {}
});

export const skeleton_text = (isLoaded: boolean) => !isLoaded ? ({
  width: '60%',
  height: '1.2rem',
  borderRadius: '0.25rem',
}) : ({});

export const skeleton_text_full = (resData?: unknown) => !resData ? ({
  width: 'inherit',
  height: '1.2rem',
  borderRadius: '0.25rem',
}) : ({});


export const blue_bg = (isBlue: boolean) => ({
  backgroundColor: isBlue ? 'var(--blueTheme)' : '#fff',
  padding: isBlue ? '7px 5px' : '',
  display: 'flex',
  borderRadius: 5,
  overflow: 'overlay',
});

export const blue_theme = (isBlue: boolean) => ({
  borderRadius: 5,
  border: !isBlue ? 'solid 1px #f2f2f2' : '',
  minWidth: 170,
  height: 60,
  backgroundColor: '#fff',
  margin: 5,
  padding: 10,
  alignContent: 'space-between',
  display: 'grid'
});

export const card_title = ({
  fontSize: 'var(--fz-m)',
  fontWeight: 'var(--fw-l)',
  color: '#707070',
  textAlign: 'left' as const
});

export const section_title = ({
  display: 'flex',
  alignItems: 'center',
  paddingBlock: 20,
  textAlign: "left" as const,
  marginBottom: 0
});

export const bg_template = (isBlue: boolean) => ({
  display: 'flex',
  padding: 10,
  width: 'auto',
  borderRadius: 5,
  border: !isBlue ? 'solid 1px #f2f2f2' : '',
  backgroundColor: isBlue ? 'var(--blueTheme)' : '#fff',
});
