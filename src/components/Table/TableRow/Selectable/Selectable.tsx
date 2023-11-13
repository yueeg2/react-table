
import {
  Checkbox,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";
import TableRowTheme from "../TableRowTheme";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SquareIcon from '@mui/icons-material/Square';
import Cell from "../../TableCell";
import { TableRowProps } from "../../table.d";
import { CheckboxTheme } from "../../../../styles";


interface TableRowSelectableProps extends TableRowProps {
  handleSelect: (id: string) => (e: any) => void,
  selectedRowsId: (id: string) => boolean,
  index: string,
  disabled?: boolean
}

const Selectable = ({
  TH,
  TR,
  style,
  disabled = false,
  handleSelect,
  selectedRowsId, }: TableRowSelectableProps) => {

  const selectTRId = TR[0].rowID.toString();
  // console.log("sdfsdfsd", selectTRId)
  const rowSelected = selectedRowsId(selectTRId)

  //console.log('Selectable', selectTRId, TR)

  return <ThemeProvider theme={TableRowTheme(style)}>
    <MuiTableRow onClick={handleSelect(selectTRId)}
      hover role="checkbox"
      tabIndex={-1}
      sx={{ alignItems: 'start' }}
      aria-label={`SelectableRow-${selectTRId}`}
      selected={rowSelected}
    >
      <TableCell padding="checkbox">
        <ThemeProvider theme={CheckboxTheme}>
          <Checkbox checked={rowSelected || disabled}
            inputProps={{
              'aria-labelledby': selectTRId,
              'aria-label': `checkbox-${selectTRId?.split('_')[1]}`
            }}
            disabled={disabled}
            checkedIcon={disabled ? <SquareIcon /> : <CheckBoxIcon />}
            icon={<div style={{
              width: '1rem',
              height: '1rem',
              marginInlineStart: 3,
              borderRadius: 2,
              border: 'solid 1px #aaa'
            }} />}
          />
        </ThemeProvider>
      </TableCell>
      {TH?.map((headCell, i) => <Cell
        id={headCell.id}
        TRCell={TR[i]} />)}
    </MuiTableRow>
  </ThemeProvider>
}

export default Selectable