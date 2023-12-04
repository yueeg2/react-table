'use client'
import React from 'react';
import {
  Box,
  TableBody,
  Table as MuiTable,
  TableRow as MuiTableRow,
} from '@mui/material';
import TableHead from "../Table/TableHead";
import Base from "../Table/TableRow/Base";
import Selectable from '../Table/TableRow/Selectable';
import Collapsible from '../Table/TableRow/Collapsible';
import {
  stableSort,
  getComparator
} from "@/utils/table";
import {
  type StyledTableProps,
  type TRProps
} from "@/utils/table.d";

import { usePaging } from './usePaging';
import { useSearch } from './useSearch';
import { useSort } from './useSort';
import { useSelects } from './useSelects';
import useSwitch from '../Switch/useSwitch';

import { bg_template } from '@/styles';

import TableContainer from './TableContainer';
import Cell from './TableCell';
import Checkbox from './TableCell/Checkbox';

/**
 * 
 * @param param0 
 * @returns 
 */
const Table = ({
  CustomTab, //TEST
  thead,
  tbody,
  placeholder,
  tabbable,
  sortable,
  searchable,
  collapsible,
  pageable,
  selectable, selectActions, onSelect,
  styles,
  isBlue = false,
  bgcolor,
  inlineStyle,
  overflow,
  children }: StyledTableProps) => {

  /** paging */
  const [startIndex, endIndex, TablePagination] = usePaging();

  /** sorting */
  const {orderBy, order, handleRequestSort} = useSort();

  /** searching */
  const { filterFn, handleSearch } = useSearch();

  /** selecting */
  const { selectedForRemove,
    setSelectedForRemove,
    handleSelectAllClick,
    handleSelectRowClick,
    selectedRowsId } = useSelects(tbody);

  /** toggle all collapse */
  const { switchValue, handleSwitchChange } = useSwitch(false);

  /** handle collapsible inner table */
  const [innerTable, setInnerTable] = React.useState(collapsible);

  /** entity sorting & searching & paging － filterFn.fn(tbody) */
  const visibleRows = React.useMemo(
    () => stableSort(filterFn.fn(tbody), getComparator(order, orderBy)).slice(
      startIndex,
      endIndex,
    ),
    [tbody, order, orderBy, startIndex, endIndex, filterFn]);

  const isRowHasBeenSelected = (v: TRProps): boolean => selectedForRemove.includes(v?.cells[0].rowID.toString());

  const TableInstance = () => <MuiTable stickyHeader>
    <TableHead TH={thead}
      style={styles?.th || { fontWeight: 'bold' }}
      sortable={sortable ? {
        order: order,
        orderBy: orderBy,
        onRequestSort: handleRequestSort
      } : undefined}
      selectable={selectable ? <Cell checkbox>
        <Checkbox  {...{
          oriRowAmount: tbody.length && Object.entries(tbody).length,
          selectedRowAmount: selectedForRemove.length,
          onChange: handleSelectAllClick
        }} />
      </Cell> : undefined}
      collapsible={collapsible ? collapsible : undefined} />
    <TableBody>
      {
        !visibleRows.length
          ? <MuiTableRow role="tr" id={`THeadRowEmpty`} key={`row-empty`}
            sx={{ position: 'relative' }} >
            <td className='absolute w-full py-2 flex justify-center'
              style={{ top: 30, color: '#808080' }}>
              <span>{placeholder ?? '無結果'}</span>
            </td>
          </MuiTableRow>
          : visibleRows.map((TR: [TRProps, number], i: number) => selectable
            ? <Selectable
              key={`row-selectable-${TR[1]}`}
              index={`${TR[1]}`}
              style={{ backgroundColor: bgcolor }}
              TH={thead}
              TR={TR[0].cells || TR[0].disabled}
              disabled={TR[0]?.disabled ? true : false}
              selectedRowsId={selectedRowsId}
              handleSelect={handleSelectRowClick} />
            : innerTable
              ? <Collapsible key={`row-collapsible-${TR[1]}`}
                style={{ backgroundColor: bgcolor }}
                TH={thead}
                TR={TR[0].cells || TR[0].disabled}
                index={i}
                innerTable={innerTable[i]}
                allCollapse={switchValue} />
              : <Base key={`row-base-${TR[1]}`}
                id={`${TR[1]}`}
                TH={thead}
                TR={TR[0].cells || TR[0].disabled}
                style={{ backgroundColor: bgcolor }} />)
      }
    </TableBody>
  </MuiTable>;


  /** select side effect */
  React.useEffect(() => {
    if (!onSelect) return;
    onSelect(selectedForRemove);
  }, [selectedForRemove, onSelect]);


  /** collapse side effect */
  React.useEffect(() => {
    if (!collapsible) return;

    const updatedInnerTable = visibleRows.map(row => {
      const correspondingIndex = tbody.findIndex((tr: any) => tr === row[0]);
      return collapsible[correspondingIndex] || null;
    });

    setInnerTable(updatedInnerTable);
  }, [visibleRows]);

  /** tbody side effect */
  React.useEffect(() => {
    setSelectedForRemove(() => []);
  }, [tbody.length, setSelectedForRemove]);

  return <div className='relative' style={{ ...bg_template(isBlue), ...inlineStyle }} >
    <TableContainer isBlue={isBlue}
      searchable={searchable ? handleSearch : false}
      collapsible={collapsible ? handleSwitchChange : false}>
      <>
        {children ? children : null}
        {
          (selectable && selectedForRemove.length) ? <Box className="flex absolute px-2 gap-2 top-0 left-[300px]">
            {
              selectActions ? selectActions?.map(({ status, action, ActionElement }: any) => {
                //const StatusSet = new Set(visibleRows.map((v, i) => v[0]?.cells && isRowHasBeenSelected(v[0]) && v[0]?.cells[0].label.props.status))
                const rowSet = new Set(visibleRows.map((v, i) => v[0]?.cells && isRowHasBeenSelected(v[0]) && v[0]?.cells[0].label.props?.status === status && v[0]?.cells).filter(element => !!element))
                //console.log(visibleRows.map((v, i) => v[0]?.cells && isRowHasBeenSelected(v[0]) && v[0]?.cells[0].label.props.status === status && v[0]?.cells).filter(element => !!element), rowSet, StatusSet, status)
                return <ActionElement onClick={action(rowSet, [selectedForRemove, setSelectedForRemove], status)} />

              }) : null
            }
          </Box> : null
        }
        {
          (tabbable && CustomTab) ? <CustomTab >
            <TableInstance />
          </CustomTab> : <Box sx={{ ...overflow }}>
            <TableInstance />
          </Box>
        }
        {
          (pageable && visibleRows.length) ? <TablePagination rowCount={tbody.length} /> : null
        }
      </>
    </TableContainer >
  </div >
}

export default Table
