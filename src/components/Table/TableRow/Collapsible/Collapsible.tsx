import * as React from 'react';
import {
  Table,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider,
  Collapse as MuiCollapse,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TRProps, TableRowProps } from "@/components/Table/table.d";
import TableRowTheme from "../TableRowTheme";
import { HeadCellProps } from '@/components/Table/table.d';
import Cell from '../../TableCell';
import TableHead from '../../TableHead';

interface TableRowCollapseProps extends TableRowProps {
  innerTable: { TH: HeadCellProps[], TR: TRProps[] },
  index: number,
  allCollapse: boolean,
}

const Collapsible = ({
  TH,
  TR,
  style,
  innerTable,
  allCollapse
}: TableRowCollapseProps) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(allCollapse);
  }, [allCollapse])

  return (
    <ThemeProvider theme={TableRowTheme(style)}>
      <MuiTableRow>
        <ThemeProvider theme={TableRowTheme(style)}>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </TableCell>
        </ThemeProvider>
        {TH.length ? TH?.map((headCell, i) => <Cell
          id={headCell.id}
          TRCell={TR[i]} />) : null}
      </MuiTableRow>
      <MuiTableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={TH.length + 1}>
          <MuiCollapse in={open} timeout="auto" unmountOnExit style={{ paddingBottom: '10px' }}>
            {
              innerTable
                ? <Table>
                  <TableHead TH={innerTable.TH} />
                  {innerTable.TR.map((TR: TRProps, i) =>
                    <MuiTableRow key={`innerTableRow-${i}`}>
                      {
                        innerTable.TH.length
                          ? innerTable.TH.map((headCell, i: number) => <Cell
                            id={headCell.id}
                            TRCell={TR.cells[i]} />)
                          : null
                      }
                    </MuiTableRow>)}
                </Table>
                : null
            }
          </MuiCollapse>
        </TableCell>
      </MuiTableRow>
    </ThemeProvider>
  )
};

export default Collapsible;