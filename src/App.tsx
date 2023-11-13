import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Paper } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import './css/globals.css';
import { useSelectFilter } from './components/Table/useSelectFilter';
import { createTH } from './components/Table/utils/mock';
import Table from './components/Table';
import Button from './components/Button';
import { useSelectTriggers } from './utils/app/useSelectTriggers';
import { MockTbody } from './utils/app/MockTbody';

function App() {

  const {
    WithSelectFilter,
    methods,
  } = useSelectFilter([])

  const onSubmit = (data: any) => alert(`ready to save(data): ${JSON.stringify(data)}`)


  const SelectTriggers = useSelectTriggers()
  console.log("Errors:", methods.formState.errors);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <Paper sx={{ minHeight: "80vh" }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Button text="SAVE"
                type="submit"
                buttonColor="var(--blue-pacific)"
                style={{
                  backgroundColor: "var(--blue-pacific)",
                  display: "flex",
                  justifyContent: "center"
                }} />
              <Table rows={[]} headCells={[]} initOrder={''} {...{
                tabbable: false,
                sortable: false,
                collapsible: false,
                pageable: true,
                searchable: true,
                selectable: true,
                selectActions: SelectTriggers,
                thead: createTH(["Text", "Chip", "Icon", "Input", "Select", "Choice", "Copy",], "center", []),
                tbody: MockTbody(methods),
                overflow: { overflowX: 'scroll' }
              }} {...{}} />
            </form>
          </FormProvider>
        </Paper>
      </div>

    </div>
  );
}

export default App;
