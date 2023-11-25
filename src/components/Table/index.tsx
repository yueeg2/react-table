'use client'
import React from 'react';

import TableBody from "@mui/material/TableBody";
import {
  Box,
  Table as MuiTable,
  TableRow as MuiTableRow,
} from '@mui/material';
import useSwitch from '../Switch/useSwitch';

import Base from './TableRow/Base';
import Selectable from './TableRow/Selectable';
import Collapsible from './TableRow/Collapsible';
import { usePaging } from './usePaging';
import TableContainer from './TableContainer';
import { getComparator, stableSort } from './Table.utils';

import { StyledTableProps, TRCellProps, TRProps } from './table.d';



import { bg_template } from '../../styles';
import { useSort } from './useSort';
import { useSelects } from './useSelects';
import TableHead from './TableHead';




const Table = ({
  // main feat
  tabbable,
  sortable,
  collapsible,
  searchable,
  pageable,
  selectable, selectActions, onSelect,
  //
  CustomTab, // test
  thead,
  tbody,
  styles,
  placeholder,
  isBlue = false,
  bgcolor,
  overflow,
  children }: StyledTableProps) => {
  //const theme = useTheme();

  /** paging */
  const [startIndex, endIndex, TablePagination] = usePaging();

  /** sorting */
  const [orderBy, order, handleRequestSort] = useSort('');

  /** searching */
  const [filterFn, setFilterFn] = React.useState<{ fn: (rows: TRProps[]) => any }>({ fn: (rows: TRProps[]) => rows });

  const handleSearch = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const queryString = evt.target.value.toLowerCase();

    setFilterFn({
      fn: (rows: TRProps[]) => {

        let searchLabel: string = '';

        //let FilteredRows: TRProps[] = [];
        //TODO (bigO)
        const FilteredRows = rows.map((TR: TRProps) => {


          for (let Cell of Object.values(TR.cells || TR.disabled)) {

            if (queryString === '') {
              return TR //FilteredRows.push(TR)
            }
            //console.log(TR, typeof Cell.label);


            // parser Cell.label by type
            if (typeof Cell.label === 'string') {
              searchLabel = Cell.label
            }
            if (typeof Cell.label === 'number') {
              searchLabel = Cell.label.toString();
            }
            if (typeof Cell.label === 'object') {
              //if the target string in wrapped in button, Link or a

              const { status, last_updated, node_ip, node_type, children, label } = Cell.label.props

              //console.log("CELL", Cell.label.props);

              if (typeof children === 'string') {
                searchLabel = children;
              } else if (children && children[0] && children[1] && children[1].props.label) {
                searchLabel = children[1].props.label;
              } else if (children && children[0] && children[1]) {
                searchLabel = children[0].props.children.props.children
              } else if (children && children[0]) {
                const text = children[0].props;
                searchLabel = text.children;
              } else if (children?.props) {
                const { label } = children.props;
                if (label) {
                  searchLabel = label;
                }
              } else if (status || last_updated || node_ip || node_type || label?.toString() || Cell.label.props['aria-label']) {
                searchLabel = (status + last_updated + node_ip + node_type + (label?.toString() || "") + (Cell.label.props['aria-label'] || "")).replace(/undefined/ig, '');
              }

              if (!searchLabel) {
                searchLabel = children ? children.toString() : ''
                console.log('searchLabel', searchLabel);
              }

            }
            //
            if (!searchLabel) {
              console.error('searchLabel is', searchLabel)
              break;
            }
            if (
              queryString !== '' &&
              !searchLabel.toString().toLowerCase().includes(queryString)) {
              continue;
            } else {
              return TR //FilteredRows.push(TR)
            }
          }

        })
        return FilteredRows.filter(v => v)
      }
    });
  }, [thead]);

  /** entity sorting & searching & paging － filterFn.fn(tbody) */
  const visibleRows = React.useMemo(
    () => stableSort(filterFn.fn(tbody), getComparator(order, orderBy)).slice(
      startIndex,
      endIndex,
    ),
    [tbody, order, orderBy, startIndex, endIndex, filterFn]);

  /** selecting */
  const {
    selectedForRemove,
    setSelectedForRemove,
    handleSelectAllClick,
    handleSelectRowClick,
    selectedRowsId } = useSelects(tbody);

  /** select side effect */
  React.useEffect(() => {
    if (!onSelect) return;
    onSelect(selectedForRemove);
  }, [selectedForRemove, onSelect]);

  /** handle collapsible inner table */
  const [innerTable, setInnerTable] = React.useState(collapsible);

  /** change row side effect */
  React.useEffect(() => {
    if (!collapsible) return;

    const updatedInnerTable = visibleRows.map(row => {
      const correspondingIndex = tbody.findIndex((tr: { [x: string]: TRCellProps;[x: number]: TRCellProps;[x: symbol]: TRCellProps; }) => tr === row[0]);
      return collapsible[correspondingIndex] || null;
    });

    setInnerTable(updatedInnerTable);
  }, [visibleRows]);

  /** toggle all collapse */
  const { switchValue, handleSwitchChange } = useSwitch(false);

  /** side effect */
  React.useEffect(() => {
    setSelectedForRemove(() => []);
  }, [tbody.length]);


  const isRowsIncludeSelected = (v: TRProps) => selectedForRemove.includes(v?.cells[0].rowID.toString());

  const TableInstance = () => <MuiTable stickyHeader>
    <TableHead TH={thead}
      style={styles?.th || { fontWeight: 'bold' }}
      sortable={sortable
        ? {
          order: order,
          orderBy: orderBy,
          onRequestSort: handleRequestSort
        }
        : undefined}
      selectable={selectable
        ? {
          oriRowAmount: tbody.length && Object.entries(tbody).length,
          selectedRowAmount: selectedForRemove.length,
          onChange: handleSelectAllClick
        }
        : undefined}
      collapsible={collapsible
        ? collapsible
        : undefined} />
    <TableBody>
      {visibleRows.length
        ? visibleRows.map((
          TR: [TRProps, number], i: number) => selectable
            ? <Selectable
              index={`${TR[1]}`}
              style={{ backgroundColor: bgcolor }}
              TH={thead}
              TR={TR[0].cells || TR[0].disabled}
              disabled={TR[0]?.disabled ? true : false}
              selectedRowsId={selectedRowsId}
              handleSelect={handleSelectRowClick} />
            : innerTable
              ? <Collapsible //TODO
                style={{ backgroundColor: bgcolor }}
                TH={thead}
                TR={TR[0].cells || TR[0].disabled}
                index={i}
                innerTable={innerTable[i]}
                allCollapse={switchValue} />
              : <Base key={`BaseRow-${TR[1]}`}
                id={`${TR[1]}`}
                TH={thead}
                TR={TR[0].cells || TR[0].disabled}
                style={{ backgroundColor: bgcolor }} />)
        : <MuiTableRow role="tr" id={`THeadRowEmpty`}
          sx={{ position: 'relative' }} >
          <td className='absolute w-full py-2 flex justify-center'
            style={{ top: 30, color: '#808080' }}>
            <span>{placeholder ?? '無結果'}</span>
          </td>
        </MuiTableRow>
      }
    </TableBody>
  </MuiTable>;

  return <div className="react-table relative" style={{ ...bg_template(isBlue) }}>
    <TableContainer isBlue={isBlue}
      searchable={searchable ? handleSearch : false}
      Collapse={collapsible ? handleSwitchChange : false}
    >
      <>
        {children ? children : null}
        {
          (selectable && selectedForRemove.length)
            ? <Box className="flex relative md:absolute pr-2 py-1 gap-0 gap-1 md:px-2 md:py-0 top-0 md:left-[300px]">
              {selectActions
                ? selectActions?.map(({ status, action, ActionElement, statusIndex }: any) => {
                  const StatusSet = new Set(visibleRows.map((v, i) => v[0]?.cells && isRowsIncludeSelected(v[0]) && v[0]?.cells[statusIndex].label.props?.status))
                  const rowSet = new Set(visibleRows.map((v, i) => v[0]?.cells && isRowsIncludeSelected(v[0]) && v[0]?.cells[statusIndex].label.props?.status === status && v[0]?.cells).filter(element => !!element))
                  //console.log(rowSet, StatusSet, status)
                  if ((StatusSet.has('warning') && status === 'warning')
                    || (StatusSet.has('critical') && status === 'critical')
                  ) {
                    return <ActionElement onClick={action(rowSet, [selectedForRemove, setSelectedForRemove], status)} />
                  }

                })
                : null}
            </Box>
            : null
        }
        {
          tbody
            ? (tabbable && CustomTab)
              ? <CustomTab >
                <TableInstance />
              </CustomTab>
              : <Box sx={{ ...overflow, minHeight: '50vh' }}>
                <TableInstance />
              </Box>
            : null
        }
        {
          pageable && visibleRows.length
            ? <TablePagination rowCount={tbody.length} />
            : null
        }
      </>
    </TableContainer >
  </div >
}

export default Table