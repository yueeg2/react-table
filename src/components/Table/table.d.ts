
type TRKey = "cells" | "disabled" | string

export type CustomTableRowStyle = {
  padding?: string,
  hover?: string,
  backgroundColor?: string,
  hoverHeight?: any
}

export type Row = {
  id: string,
  [key: string]: any;
}
export interface CustomTableRowProps {
  readonly row: Row;
  style?: object;
  setRemove?: any;
  setSelected?: any;
  selected?: any;
  [key: string]: any;

}

export interface StyledTableProps extends TableProps {
  styles?: any;
  isBlue?: boolean;
  bgcolor?: any;
  inlineStyle?: any;
  overflow?: { overflowX?: string, overflowY?: string }
};

export interface HeadCellProps {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export type TRCellProps = {
  id: string,
  label: any,
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right',
  [key: string]: any
};

export type TRProps = {
  [key in TRKey]: {
    [key in string | number | symbol]: TRCellProps
  };
};

export interface Data {
  schedule: number;
  dashboard: number;
  subject: number;
  content: number;
  editor: number;
}
export interface TableProps {
  readonly rows: Array<any>;
  readonly headCells: Array<HeadCellProps>;
  initOrder: string;
  sort?: boolean;
  setRemove?: any;
  style?: {
    tablehead?: any;
    tablerow?: any;
    boxTr?: any;
    tablebody?: any;
  },
  isBlue?: boolean;
  isLoaded?: boolean;
  [key: string]: any;
}

export type TableRowStyleProps = {
  backgroundColor?: string;
  padding?: string;
  color?: string;
  rowStyle?: 'box';
}

export interface TableRowProps {
  readonly TR: TRProps;
  readonly TH: Array<HeadCellProps>;
  readonly id?: string;
  readonly style?: TableRowStyleProps;
  readonly key?: string;
}

export interface TableHeadProps {
  readonly TH: Array<HeadCellProps>;
  style?: CSSObject;
  selectable?: TableSelectProps;
  sortable?: TableSortProps;
  collapsible?: TableCollapisbleProps[];
}
export type TableSelectProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  oriRowAmount: number;
  selectedRowAmount: number;
}
export type TableSortProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, sorter: string) => void;
  order: Order;
  orderBy: string;
}

export type TableCollapisbleProps = {
  readonly TH: Array<HeadCellProps>;
  TR: TRProps[];
}

export interface HeadCellProps { id: string; label: string; hidden: boolean; align: "center" | "left"; }

export interface EnhancedTableProps {
  readonly headCells: Array<HeadCellProps>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
interface TableExtendsion {
  Search?: any,
  Paging?: JSX.Element,
  Collapse?: any,
}

export interface TableContainerProps extends TableExtendsion {
  borderSize?: number,
  minWidth?: number,
  maxHeight?: number,
  hiddenOverflow?: boolean,
  boxTr?: object,
  isBlue?: boolean,
  children: any,
}

