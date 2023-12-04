
import {
  TableRow as MuiTableRow,
  ThemeProvider,
} from "@mui/material";
import Cell from "src/components/Table/TableCell";
import { TRTheme } from "src/styles/mui";
import { CreateTRProps } from "src/utils/table.d";

const Base: React.FunctionComponent<CreateTRProps> = (
  {
    TH,
    TR,
    id,
    style,
  }
) => {

  const Cells = Object?.values(TR) ?? [];

  return <ThemeProvider theme={TRTheme(style)}>
    <MuiTableRow hover role="checkbox"  tabIndex={-1}>
      {
        TH?.map((THcell, i) => <Cell
          key={`base-tr-cell-${i}`}
          id={`base-tr-cell-${THcell.id || id}`}>{Cells[i]?.label}</Cell>)
      }
    </MuiTableRow>
  </ThemeProvider>
};

export default Base