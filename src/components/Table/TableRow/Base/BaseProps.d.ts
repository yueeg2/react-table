import { HeadCellProps } from "components/Table/table.d";

export type CellProps = {
  TRCell: TRCellProps;
  id: string;
};
export type TableRowBaseProps = {
  TH: HeadCellProps[];
  TR: { [key: number]: { label: string } };
  style?: object;
  key: string;
};