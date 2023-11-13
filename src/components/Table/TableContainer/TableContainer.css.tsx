
/**
 * 
 * @param isBlue 
 * @returns 
 */
export function StyledTableContainer(isBlue: boolean) {
  return ({
    Paper: {
      minHeight: 200,
      width: '100%',
      backgroundColor: isBlue ? 'var(--blueTheme)' : '#fff',
      boxShadow: isBlue ? 'none' : 'default',
      overflow: 'hidden'
    },
    Topbar: { display: 'flex', justifyContent: 'space-between' },
    Footer: {}
  })
}
