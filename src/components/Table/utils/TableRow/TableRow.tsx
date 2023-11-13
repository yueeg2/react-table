
import { useEffect, useState } from "react";
import {
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";
import { StyledTableCellProps, StyledTableRowTheme } from "./TableRow.theme";
import { colmunsName } from "./constants";
import { CustomTableRowProps, Row } from "../../table.d";

/**
 * create the cell, don't show the content if the cell's name is not found in hideThIds
 * @param row 
 * @returns 
 */
export function CellDisplayHandler(row: Row) {
  return colmunsName.map((colName: string, ind: number) => {
    const index: number = Object
      .entries(row)
      .findIndex((x: [string, string]) => x[0] === colName);
    return index !== -1
      ? <TableCell
        key={`utils-tablerow-${row.id}-${colName}`}
        {...StyledTableCellProps(ind)}
      > {/** align={column.align} */}
        {Object.entries(row)[index][1]}
      </TableCell>
      : <TableCell
        key={`utils-tablerow-${row.id}-${colName}-empty`}
        {...StyledTableCellProps(ind)}
      > {/** align={column.align} */}
      </TableCell>
  })
}
export default function TableRow({ row, style, ind, customTableName }: CustomTableRowProps) {

  /**
   * hoverable and highlighted the colmuns with flexible function
   */
  const [hoverHeight, setHoverHeight] = useState({ height: 0 });
  useEffect(() => {
    const TableHeightquerySelector
      = document.querySelector(`table[aria-labelledby="${customTableName}"]`) as HTMLElement
    const cellTopPosquerySelector
      = document.querySelector(`table[aria-labelledby="${customTableName}"] > tbody > tr:nth-child(${ind}) > td:nth-child(2)`) as HTMLElement
    const headcellquerySelector
      = document.querySelector(`table[aria-labelledby="${customTableName}"] > thead > tr > th`) as HTMLElement;
    const TableHeight = TableHeightquerySelector.offsetHeight
    const cellHeight = cellTopPosquerySelector.offsetHeight
    const headcellHeight = headcellquerySelector.offsetHeight
    hoverHeight?.height !== TableHeight
      && setHoverHeight(() => ({ top: (cellHeight * ind) + headcellHeight - cellHeight, height: TableHeight }))
  }, [hoverHeight.height])


  return <ThemeProvider theme={StyledTableRowTheme({ ...style, hoverHeight })}>
    <MuiTableRow hover tabIndex={-1}>
      {CellDisplayHandler(row)}
    </MuiTableRow>
  </ThemeProvider>
};
