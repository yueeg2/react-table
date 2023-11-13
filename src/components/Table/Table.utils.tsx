import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { EnhancedTableProps, HeadCellProps, Order, TRCellProps } from './table.d';
import Chip from '../Chip';



export const periodMaps = {
  'year': '每年',
  'quart': '每季',
  'month': '每月',
  'week': '每週',
  'day': '每日'
}
export const weeknameMaps = {
  '1': 'ㄧ',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '日',
}
export const quartMaps = {
  '1': '1,4,7,10月',
  '2': '2,5,8,11月',
  '3': '3,6,9,12月',
}
// const comparatorMaps = {
//   'schedule': 'period',
//   'dashboard': 'dashboard_names',
//   'subject': 'mail',
//   'content': 'mail',
//   'editor': 'username',
// }


const sentDayMaps = (period: string, sendDay: number) => {
  let dd = sendDay.toString().slice(-2);
  let mm = sendDay.toString().replace(dd, '');
  if (period === 'year')
    return ` ${mm}月${dd}日`
  if (period === 'quart')
    return ` 第${mm}月${dd}日`
  if (period === 'month')
    return ` ${dd}日`
  if (period === 'week')
    return `${weeknameMaps[dd as keyof typeof weeknameMaps]}`
  if (period === 'day')
    return ``
};
const sentTimeMaps = (sendTime: string) => {
  let [hour, min]: Array<string> = sendTime.split(":");

  return `${hour.length < 2
    ? (hour === '0' ? '12' : '0' + hour)
    : (parseInt(hour) > 12 ? parseInt(hour) - 12 : hour)}:${min.length < 2
      ? '0' + min
      : min} ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`
};
/**
 * parser time format from 24 to 12
 * @param row 
 * @returns string
 */
export function parserFormat(row: ReturnType<typeof reportRows>): string {
  const { period, sendDay, sendTime } = row.schedule;

  return periodMaps[period as keyof typeof periodMaps]
    + sentDayMaps(period, sendDay) + ' '
    + sentTimeMaps(sendTime)
};
export function reportRows(
  schedule: {
    period: string,
    sendDay: number,
    sendTime: string,
  },
  dashboard: {
    dashboard_ids: string,
    dashboard_names: string,
  },
  mail: {
    subject: string,
    content: string,
    recipient: string,
    recipient_userid: string,
  },
  editor: {
    userid: string,
    username: string,
  },
  name: string,
  type: string,
  filter: string,
) {
  return {
    schedule,
    dashboard,
    mail,
    editor,
    name,
    type,
    filter,
    history: dashboard.dashboard_names.split(',').map(val => {
      return {
        name: val,
      }
    })
  };
};

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className='workBlockColor'>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headCells.map((headCell: HeadCellProps, ind: number) => (
          <TableCell
            //width={ !ind ? '19%': (ind < 3 ? '30%': '')}
            className='workBlockColor'
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type StateMap = {
  [key: string]: number;
};
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  //let field = comparatorMaps[orderBy as keyof typeof comparatorMaps];

  const stateMap: StateMap = {
    'ok': 1,
    'warning': 2,
    'critical': 3
  }
  const ChildCols = {
    'schedule': 'period',
    'dashboard': 'dashboard_names',
    'editor': 'username',
  };
  const ParentCols = ['subject', 'content'];
  const MuiCols = ['recipient', 'contact_type'];
  const hisCols = ['time', 'description', 'abnormal_node'];
  const textUpperCols = ['displayname'];
  const MuiColsChild = ['system_disk', 'data_disk'];
  const MuiColsNarrChild = ['memory', 'cpu']
  const specCols = Object.keys(ChildCols).concat(ParentCols, MuiCols, hisCols, textUpperCols,);

  const getValue = (pos: any, orderBy: string): string | false => {
    let value: string | false = false;
    value = Object.keys(ChildCols).includes(orderBy) && pos[orderBy][ChildCols[orderBy as keyof typeof ChildCols]];
    value = ParentCols.includes(orderBy) ? pos['mail'][orderBy] : value
    value = MuiCols.includes(orderBy) ? (pos[orderBy]?.props ? (pos[orderBy]?.props.defaultValue?.value || pos[orderBy]?.props.defaultValue?.Script) : pos[orderBy]) : value
    value = hisCols.includes(orderBy) ? pos[orderBy]?.props.children : value
    value = textUpperCols.includes(orderBy) ? pos[orderBy].toLowerCase() : value
    value = MuiColsChild.includes(orderBy) ? pos[orderBy]?.props.children[0].props.children : value
    value = MuiColsNarrChild.includes(orderBy) ? pos[orderBy]?.props.children[0].props.children.props.children : value
    //value = MuiColsChild.includes(orderBy) ? pos[orderBy]?props.children

    return value;
  }


  let cloneA: any = (typeof orderBy !== 'string')
    ? a[orderBy]
    : (specCols.includes(orderBy)
      ? getValue(a, orderBy)
      : a[orderBy]);
  let cloneB: any = typeof orderBy !== 'string'
    ? b[orderBy]
    : (specCols.includes(orderBy)
      ? getValue(b, orderBy)
      : b[orderBy]);

  if (typeof cloneA === 'object' && cloneA?.props?.state) {
    cloneA = cloneA ? stateMap[cloneA?.props?.state as keyof typeof stateMap] : 0
  }
  if (typeof cloneB === 'object' && cloneB?.props?.state) {
    cloneB = cloneB ? stateMap[cloneB?.props?.state as keyof typeof stateMap] : 0
  }
  if (typeof cloneA === 'object' && cloneA?.props?.children) {
    cloneA = cloneA ? cloneA?.props?.children[0] : 0
  }
  if (typeof cloneB === 'object' && cloneB?.props?.children) {
    cloneB = cloneB ? cloneB?.props?.children[0] : 0
  }

  if (!cloneA) {
    cloneA = 0
  }
  if (!cloneB) {
    cloneB = 0
  }

  if (orderBy === 'contact_type') {
    cloneA = (cloneA && cloneA.Script)
  }
  if (orderBy === 'contact_type') {
    cloneB = (cloneB && cloneB.Script)
  }
  if (cloneB < cloneA) {
    return -1;
  }
  if (cloneB > cloneA) {
    return 1;
  }

  return 0;
};

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
/**
 * handle sorting
 * @param array 
 * @param comparator 
 * @returns 
 */
export function stableSort<T extends { [key in string | number | symbol]: TRCellProps }>(array: readonly T[], comparator: (a: TRCellProps, b: TRCellProps) => number) {
  try {

    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      let aTR = a[0].cells || a[0].disabled
      let bTR = b[0].cells || b[0].disabled
      // console.log(aTR[0].label, bTR[0].label)
      const order = comparator(aTR, bTR);
      //console.log('order', order)
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis

  } catch (e) {
    console.log(e)
    return []
  }



}


/**
 * TableRow Type:
 * Base
 * Selects
 * Collaspse
 * @param param0 
 * @returns 
 */


export const LablesMapping = {
  "displayname": "聯絡人",
  "username": "聯絡人",
  "node_count": "節點數",
  "es_total_shard": "ES 分片數",
  "mariadb_cluster_health": "DB 群集健康度",
  "es_cluster_health": "ES 群集健康度",
  "mariadb": "DB",
  "cpu": "CPU",
  "nodetype": "Node Type",
  "system_disk": "Sys_disk",
  "elasticsearch": "ES",
  "recipient": "名稱",
  "recipients": "聯絡人",
  "recipient_contact_type": "發送方式",
  "contact_type": "發送方式",
  "custom_program": "自定義程式",
  "test_program": " ",
  "test_result": " ",
  "row_copy": " ",
  "row_delete": " ",
  "ip": "IP位址",
  "cluster": "Cluster",
  "time": "歷史時間",
  "status": "狀態",
  "abnormal_node": "異常節點",
  "description": "Master Node",
  "overview_history": "歷史狀態"
}

export const createHeadCells = (data: Array<any>) => {
  return data.map((id: string) => ({
    id: id,
    numeric: false,
    disablePadding: false,
    label: LablesMapping[id as keyof typeof LablesMapping]
      ? LablesMapping[id as keyof typeof LablesMapping]
      : id[0].toUpperCase() + id.slice(1)
  }))
};
const NodeInfo = ({ node_type, node_ip, last_updated }: any) => <div style={{ width: 'fit-content' }}>
  <p style={{ fontSize: 'var(--fz-m)', fontWeight: 'var(--fw-l)' }} >{node_type}</p>
  <p style={{ fontSize: 'var(--fz-m)', color: '#0191ea' }}>{node_ip}</p>
  <p style={{ color: '#8d8d8d' }}>{last_updated}</p>
</div>
export const createBodyCell = (data: Array<string>, id?: number) => {
  const createDumpVal = (num: number): string | JSX.Element => {
    return num === 1
      ? (data.indexOf('state') === -1
        ? <NodeInfo
          node_type={'Master Eligible'}
          node_ip={'123.456.78.90'}
          last_updated={'最後更新 : 2020-01-07-15:00'} />
        : 'CLM_System')
      : (num === 3 && data.indexOf('state') !== -1
        ? (id === 2 ? <Chip status='critical' label='critical' /> : <Chip status='normal' label='normal' />)
        : num === 2 && data.indexOf('cpu') === -1
          ? '123.456.78.90'
          : num < 6 && num > 1
            ? '89%'
            : 'normal')
  }
  let obj = {}
  data.map((id: string, ind: number) => {
    obj = {
      ...obj,
      [id]: createDumpVal(ind)
    }
  })
  return obj
}