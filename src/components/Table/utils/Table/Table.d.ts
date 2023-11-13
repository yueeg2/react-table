
export interface Data {
  schedule: number;
  dashboard: number;
  subject: number;
  content: number;
  editor: number;
}
export interface TableProps {
  readonly rows?: Array<T>;
  headCells?: Array<readonly HeadCellProps>;
  initOrder?: string;
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

export interface TableRowProps {
  readonly row: {
    id: string,
    [key: string]: any;
  };
  style?: object;
  headCells?: Array<readonly HeadCellProps>;
  setRemove?: any;
  setSelected?: any;
  selected?: any;
  [key: string]: any;

};

export interface HeadCellProps {
  id: string;
  label: string;
  disablePadding: boolean;
  numeric: boolean;
}

export interface EnhancedTableProps {
  headCells: HeadCellProps[];
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



export type sxProps = {
  minWidth?: number | 'auto',
  maxHeight?: number | 'auto',
  height?: number | 'auto',
  border?: string,
  overflow?: string | 'hidden' | 'auto',
  boxTr?: object,
}

export type SytledTableProps = {
  Container?: {
    minWidth?: number | 'auto',
    maxHeight?: number | 'auto',
    height: number | 'auto',
  },
  Table?: {
    border?: string,
    overflow?: string | 'hidden' | 'auto',
    boxTr?: object,
  }
}
export interface CustomTableContentProps {
  isBlue: boolean,
  customTableName: string,
  readonly rows: Array<NodeHealthRows>;
  colmuns: Array<Column>,
  initOrder: string,
  isLoaded: boolean
}

export interface TableProps {
  children: JSX.Element,
  customTableName: string,
  sx?: sxProps
}
