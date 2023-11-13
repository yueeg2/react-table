/**
 *
 * @param isBlue
 * @returns
 */

export function StyledTableContainer(isBlue: boolean) {
  return ({
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
}
