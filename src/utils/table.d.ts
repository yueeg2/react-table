import { TableCellProps, TableHeadProps, TableRowProps } from "@mui/material";
import { Key } from "react";


export interface StyledTableProps extends TableProps {
  styles?: any;
  isBlue?: boolean;
  bgcolor?: any;
  inlineStyle?: any;
  overflow?: { overflowX?: string; overflowY?: string; };
};

export interface EnhancedTableProps {
  headCells: THCellProps[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
};
export type SelectAction = {
  action: (Set: any,
    [selected, setSelected]: SelectedProps,
    status: SelectAction.status) => (e: any) => void;
  ActionElement: (props: { onClick: any; }) => JSX.Element;
  status?: 'ongoing' | 'failed' | 'available' | 'processing' | 'saving' | 'running' | 'warning' | 'critical';
}
type TableProps = {
  // [key:string]:any; //TEST
  thead: THCellProps[];
  tbody: TRProps[];

  CustomTab?: ({ children }: any) => React.JSX.Element;
  placeholder?: string;
  tabbable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  selectActions?: SelectAction[];
  onSelect?: (selected: readonly string[]) => void;
  collapsible?: CollapisbleProp[];
  pageable?: boolean;
  searchable?: boolean;
  children?: JSX.Element;

};

export type SortableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, sorter: string) => void;
  order: 'asc' | 'desc';
  orderBy: string;
};
export type SelectableProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  oriRowAmount: number;
  selectedRowAmount: number;
};

export type CollapisbleProp = {
  TH: THCellProps[];
  TR: TRProps[];
};

export interface THProps {
  TH: Array<readonly THCellProps>;
  style?: CSSObject;
  selectable?: JSX.Element;
  sortable?: SortableProps;
  collapsible?: CollapisbleProp[];
};
export type TRProps = {
  [key in "cells" | "disabled" | string]: {
    [key in Key]: TRCellProps;
  };
};
export interface CreateTRProps {
  readonly TR: TRProps;
  readonly TH: Array<readonly THCellProps>;
  readonly id?: string;
  readonly style?: TableRowStyleProps;
  readonly key?: string;
};

export interface CellProps extends TableCellProps {
  children: any,
  sortable?: SortableProps,
  checkbox?: boolean
}
export interface THCellProps extends TableHeadProps {
  id: string;
  label: string;
  align: "center" | "left";
  hidden: boolean;
};
export interface TRCellProps extends TableRowProps {
  id?: string;
  label: any;
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  [key: string]: any;
};

export type TRStyleProps = {
  backgroundColor?: string;
  padding?: string;
  color?: string;
  rowStyle?: 'box';
}