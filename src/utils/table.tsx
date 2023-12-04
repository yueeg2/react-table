
import Chip from "../components/Chip";
import { TRProps, TRCellProps } from "./table.d";

/**
 * 
 * @param rowID 
 * @param Items 
 * @param align 
 * @param disabledSelect 
 * @param inputDate 
 * @returns 
 */
export const createTR = (
  rowID: number,
  Items: Array<unknown>,
  align: 'center' | 'left',
  disabledSelect?: boolean,
  inputDate?: boolean): TRProps => {
  //TODO
  const TRCell: {
    id: string,
    label: any,
    align: 'left' | 'center',
    rowID: number
  }[] = Object.assign({}, Items.map((item: unknown, i) => {
    return ({ id: `${i}`, label: item, align: align, rowID: rowID })
  }));

  const result: { [key in "cells" | "disabled" | string]: any } = {
    [disabledSelect ? "disabled" : "cells"]: TRCell,
  };

  return result
};

/**
 * 
 * @param Items 
 * @param align 
 * @param hidden 
 * @returns 
 */
export const createTH = (
  Items: Array<string>,
  align: 'center' | 'left',
  hidden?: string[]
) => {
  return Items && Items.map((item: string, i) => ({
    id: `${i}`, label: item, hidden: hidden?.includes(item) || false, align: align
  }))
};


/**
 * 
 * @param a 
 * @param b 
 * @param orderBy 
 * @returns 
 */
function descendingComparator<T extends { [key:string]: TRCellProps }>(a: T, b: T, orderBy: keyof T) {
  // console.log('a,b', a,b)

  let targetA = a[orderBy]?.label;
  let targetB = b[orderBy]?.label;

  //if the target string value is wrapped in button, Link or a
  if (typeof b[orderBy]?.label === "object") {
    targetA = a[orderBy].label.props.children.toString();
    targetB = b[orderBy].label.props.children.toString();
  }

  if (targetB < targetA) {
    return -1;
  }
  if (targetB > targetA) {
    return 1;
  }
  return 0;
};

/**
 * 
 * @param order 
 * @param orderBy 
 * @returns 
 */
export function getComparator(
  order: 'asc' | 'desc',
  orderBy: keyof TRCellProps,
): (
  a: TRCellProps,
  b: TRCellProps,
) => number {
  //console.log('order', order, 'orderBy', orderBy)
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * handle sorting
 * @param array 
 * @param comparator 
 * @returns 
 */
export function stableSort<T extends { [key in keyof TRCellProps]: TRCellProps }>(array: readonly T[], comparator: (a: TRCellProps, b: TRCellProps) => number) {
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
};

/** mock */

export const MockChipRows = [
  createTR(1, [<Chip status='success' label="成功" text='成功' />, '排程', '2023/01/01    03:00 AM', 'kong-*  …', '30GB', '54321/54321'], 'left', true),
  createTR(2, [<Chip status='success' label="成功" text='成功' />, '排程', '2023/01/01    04:00 AM', 'kong-*  …', '30GB', '54321/54321'], 'left', true),
  createTR(3, [<Chip status='saving' label="備份中" text='備份中' />, '排程', '2023/01/02    18:00 AM', 'kong-*  …', '30GB', '54321/54321'], 'left'),
  createTR(4, [<Chip status='success' label="成功" text='成功' />, '排程', '2023/01/02    08:00 AM', 'kong-*  …', '30GB', '54321/54321'], 'left', true),
  createTR(5, [<Chip status='failed' label="失敗" text='失敗' />, '排程', '2023/01/02    08:00 AM', 'kong-*  …', '30GB', '54321/54321'], 'left'),
];

export const MockChipTHs = createTH(['備份狀態', '備份方式', '備份時間', 'Indices', '備份後資料量', '資料/備份筆數'], 'left');

export const MockTLTHs = createTH(['Topic Name', 'Lags', 'Offset', 'Tags'], 'left');
