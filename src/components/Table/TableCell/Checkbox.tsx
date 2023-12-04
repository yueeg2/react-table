import { Checkbox as MuiCheckbox } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { SelectableProps } from "src/utils/table.d";
import { CheckboxTheme } from "src/styles/mui";


export default function Checkbox({
  onChange,
  selectedRowAmount,
  oriRowAmount
}: SelectableProps) {
  return <ThemeProvider theme={CheckboxTheme}>
    <MuiCheckbox
      indeterminate={selectedRowAmount > 0 && selectedRowAmount < oriRowAmount}
      checked={(oriRowAmount > 0) && selectedRowAmount === oriRowAmount}
      onChange={onChange}
      inputProps={{
        "aria-label": "selectAll",
      }}
      icon={<div style={{
        width: "1rem",
        height: "1rem",
        marginInlineStart: 3,
        borderRadius: 2,
        border: "solid 1px #aaa"
      }} />}
    />
  </ThemeProvider>
}