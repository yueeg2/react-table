import React from "react";
import { ThemeProvider } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { theme } from "./theme";

const Search: React.FunctionComponent<any> = ({
  handleSearch
}) => {

  return <ThemeProvider theme={theme}>
    <Paper component="div">
      <InputBase placeholder="Search"
        onChange={handleSearch} />
      <img style={{ paddingInline: 10 }}
        src={`${process.env.DEV || ''}/assets/search.svg`}
        alt="search" />
    </Paper>
  </ThemeProvider>
}



export default Search;