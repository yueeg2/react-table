import { HeadCellProps, Order } from '../../table';
import { CSSObject} from '@mui/material';

export type CustomTableHeadStyle = {
  color: string,
  textAlign?: undefined | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  position?: undefined | 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
}

export type Selectable = {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}
export type Sortable = {
  onRequestSort: (event: React.MouseEvent<unknown>, sorter: string) => void;
  order: Order;
  orderBy: string;
}
export type Column = HeadCellProps
export type Columns = HeadCellProps
export interface CustomTableHeadProps {
  columns: HeadCellProps[];
  style?: CSSObject;
  select?: Selectable;
  sort?: Sortable
}