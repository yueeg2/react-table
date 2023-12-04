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
import TableHead from "../../TableHead";
import Cell from "../../TableCell";
import { THCellProps, TRProps, CreateTRProps } from 'src/utils/table.d';
import { TRTheme } from 'src/styles/mui';

interface TRCollapseProps extends CreateTRProps {
  innerTable: {
    TH: THCellProps[],
    TR: TRProps[]
  },
  index: number,
  allCollapse: boolean,
}

const Collapsible: React.FunctionComponent<TRCollapseProps> = ({
  TH,
  TR,
  style,
  innerTable,
  allCollapse
}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(allCollapse);
  }, [allCollapse])

  return (
    <ThemeProvider theme={TRTheme(style)}>
      {/** layer 1 */}
      <MuiTableRow >
        <ThemeProvider theme={TRTheme(style)}>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </TableCell>
        </ThemeProvider>
        {TH.length ? TH?.map((cell, i) => <Cell
          key={`collapsible-tr-cell-${i}`}
          id={`collapsible-tr-cell-${cell.id}`}>{TR[i].label}</Cell>) : null}
      </MuiTableRow>
      {/** layer 2 */}
      <MuiTableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={TH.length + 1}>
          <MuiCollapse in={open} style={{ paddingBottom: '10px' }} timeout="auto" unmountOnExit>
            {
              innerTable
                ? <Table>
                  <TableHead TH={innerTable.TH} />
                  {innerTable.TR.map((TR: TRProps, i) =>
                    <MuiTableRow key={`inner-tr-${i}`}>
                      {
                        innerTable.TH.length
                          ? innerTable.TH.map((innerCell, i: number) => <Cell
                            key={`inner-tr-cell-${innerCell.id}`}
                            id={`inner-tr-cell-${innerCell.id}`}>{TR.cells[i].label}</Cell>)
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