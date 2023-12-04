
import { CellProps } from "src/utils/table.d";
import { TableCell } from "@mui/material";

export const Cell: React.FunctionComponent<CellProps> = ({
  id,
  align,
  children,
  sortable,
  checkbox,
  ...props
}) => {

  //
  const { orderBy, order, onRequestSort } = sortable || {};
  //
  let sortDirection = orderBy === id && sortable ? order : false;

  return <TableCell sx={{ whiteSpace: 'pre' }}
    sortDirection={sortDirection}
    align={align ? align : 'center'}
    padding={checkbox ? "checkbox" : 'normal'}
    {...props}
  >
    {children ? children : ''}
  </TableCell>;
};

export default Cell