import { TableCell } from "@mui/material";
import { CellProps } from "../TableRow/Base/BaseProps";

const Cell: React.FunctionComponent<CellProps> = ({
  TRCell,
  id,
  ...props
}) => {

  return <TableCell {...props}
    align={TRCell?.align ? TRCell.align : 'center'} sx={{ whiteSpace: 'pre' }}>
    {TRCell?.label ? TRCell.label : ''}
  </TableCell>;
};

export default Cell