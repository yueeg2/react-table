

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