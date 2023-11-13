
import {
  TableRow as MuiTableRow,
  ThemeProvider,
} from "@mui/material";
import TableRowTheme from "../TableRowTheme";
import { TableRowProps } from "@/components/Table/table.d";
import Cell from "../../TableCell";

const Base: React.FunctionComponent<TableRowProps> = (
  {
    TH,
    TR,
    id,
    style,
  }
) => {

  const Cells = Object?.values(TR) ?? [];
  
  return <ThemeProvider theme={TableRowTheme(style)}>
    <MuiTableRow hover role="checkbox" id={`BaseRow-${id}`}
      tabIndex={-1}>
      {
        TH?.map((THcell, i) => <Cell key={`Cell-${THcell.id || id}`}
          id={`Cell-${THcell.id || id}`}
          TRCell={Cells[i] ? Cells[i] : { label: '' }}
        />)
      }
    </MuiTableRow>
  </ThemeProvider>
};

export default Base