import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { StyledTableContainer } from './StyledTableContainer';
import Search from '../../Search';
import CollapseSwitch from '../../Switch/CollapseSwitch';

interface TableContainerProps {
  searchable?: any,
  children: JSX.Element,
  isBlue: boolean,
  Search?: any,
  Paging?: JSX.Element,
  Collapse?: any,
}

export default function TableContainer({
  children,
  Paging,
  Collapse,
  isBlue,
  searchable = false,

}: TableContainerProps) {


  const ssx = StyledTableContainer(isBlue)
  const MemoSearch = React.useMemo(() => searchable ? <Search handleSearch={searchable} /> : <></>, [])


  return <Paper sx={ssx.Paper} className='relative'>
    {searchable || Collapse
      ? <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          searchable
            ? MemoSearch
            : null
        }
        {
          Collapse
            ? <CollapseSwitch handleAllCollapse={Collapse} />
            : null
        }
      </Box>
      : null}
    {children}
    {Paging ? Paging : null}
  </Paper>
};
