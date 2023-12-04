import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Search from 'src/components/Search';
import CollapseSwitch from 'src/components/Switch/CollapseSwitch';
import { StyledSX } from 'src/styles';

interface TableContainerProps {
  isBlue: boolean,
  children: JSX.Element,
  pageable?: JSX.Element,
  searchable?: any,
  collapsible?: any,
}

export default function TableContainer({
  isBlue,
  children,
  collapsible,
  searchable = false,
  pageable,
}: TableContainerProps) {


  const ssx = StyledSX(isBlue);
  const MemoSearch = React.useMemo(() => searchable ? <Search handleSearch={searchable} /> : <></>, [])


  return <Paper sx={ssx.Paper} className='relative'>
    {(searchable || collapsible) ? <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {
        searchable ? MemoSearch : null
      }
      {
        collapsible ? <CollapseSwitch handleAllCollapse={collapsible} /> : null
      }
    </Box> : null}
    {children}
    {pageable ? pageable : null}
  </Paper>
};
