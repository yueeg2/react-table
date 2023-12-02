import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Paper } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import './css/globals.css';
import { createTH } from './components/Table/utils/mock';
import Table from './components/Table';
import Button from './components/Button';
import { useSelectTriggers } from './utils/app/useSelectTriggers';
import { MockTbody } from './utils/app/MockTbody';
import { TRProps } from './components/Table/table';
import Select from './components/Select/Dropdown';
import { Options } from './utils/app/Options';
import { filterRowsBy } from './utils/app/filterRowsBy';
import Badge from './components/Badge';

let init = false
function App() {

  const methods = useForm<any>({});

  const [tbody, setTbody] = React.useState<TRProps[]>(MockTbody(methods));
  const [disabledTB, setDisabledTB] = React.useState<TRProps[]>(MockTbody(methods));

  const [previewForm, setPreviewForm] = React.useState('');

  const [invisible, setInvisible] = React.useState(true);

  const [table, setTable] = React.useState({
    tabbable: false,
    sortable: false,
    collapsible: false,
    pageable: true,
    searchable: true,
    selectable: true,
  });


  const arrayByQuery = React.useCallback(async () => {
    const { Text, Chip } = methods.watch();

    return filterRowsBy(Chip, 1, filterRowsBy(Text, 0, disabledTB));

  }, [disabledTB]);

  /** listen Select Filter Changing */
  React.useEffect(() => {

    if (!init) {
      init = true
      return
    }

    arrayByQuery().then((data: TRProps[]) => {
      setTbody(data);
    });

  }, [methods.watch().Text?.value, methods.watch().Chip?.value]);


  const onSubmit = (data: any) => {

    setPreviewForm(JSON.stringify(data, null, 4))
    setInvisible(false)
  };

  const SelectTriggers = useSelectTriggers([tbody, setTbody, disabledTB, setDisabledTB])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="App-header">
        <Badge {...{ invisible }} className="grid grid-col-2">
          {<details>
            <summary style={{ fontSize: '1rem', paddingInlineEnd: 20 }}>Features</summary>
            <pre className="flex justify-center">
              <code style={{ textAlign: "justify", fontSize: '0.75rem' }} className="flex text-justify text-xs">
                {JSON.stringify(table, null, 4)}</code>
            </pre>
          </details>}
          {previewForm !== "" && <details onClick={() => setInvisible(true)}>
            <summary style={{ fontSize: '1rem' }}>Details</summary>
            <pre className="flex justify-center">
              <code style={{ textAlign: "justify", fontSize: '0.75rem' }} className="flex text-justify text-xs">
                {previewForm}
              </code>
            </pre>
          </details>}
        </Badge>
      </div>


      <div className="App-body flex justify-center">

        <Paper sx={{ minHeight: "80vh", width: "90%", borderRadius: 2 }}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Button text="SAVE"
                onClick={() => onSubmit(methods.watch())}
                type="submit"
                buttonColor="var(--blue-pacific)"
                style={{
                  backgroundColor: "var(--blue-pacific)",
                  display: "flex",
                  justifyContent: "center", borderRadius: "8px 8px 0 0"
                }} />
              {React.useMemo(() => <Table rows={[]} headCells={[]} initOrder={''} {...{
                ...table,
                selectActions: SelectTriggers,
                thead: createTH(["Text", "Chip", "Icon", "Input", "Select"], "center", []),
                tbody: tbody,
                overflow: { overflowX: 'scroll' }
              }}>

                <div style={{ right: 0 }}
                  className="relative lg:absolute gap-1 flex justify-end right-0 top-0 mb-2 lg:mb-0 min-w-[500px]" >
                  <Controller
                    name="Text"
                    control={methods.control}
                    render={(field: any) => <Select id={"Text"}
                      {...{
                        field,
                        isVisible: true,
                        setValue: methods.setValue,
                        options: Options.Text,
                        defaultValue: Options.Text[0],
                        minWidth: 180,
                        checkedList: []
                      }} />} />

                  <Controller
                    name="Chip"
                    control={methods.control}
                    render={(field: any) => <Select id={"Chip"}
                      {...{
                        field,
                        isVisible: true,
                        setValue: methods.setValue,
                        options: Options.Chip,
                        defaultValue: Options.Chip[4],
                        minWidth: 180,
                        checkedList: []
                      }} />} />
                </div>
              </Table>, [tbody])}
            </form>
          </FormProvider>
        </Paper>
      </div>

      <footer className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </footer>
    </div>
  );
}

export default App;
