import React from 'react';
import logo from './logo.svg';
import './App.css';
import './css/globals.css';
import Table from './components/Table';
import { createTR, createTH } from './components/Table/utils/mock';
import Chip from './components/Chip';
import { Paper } from '@mui/material';
import Input from './components/Input';
import Select from './components/Select/Dropdown';
import { Controller, FormProvider } from 'react-hook-form';
import { useSelectFilter } from './components/Table/useSelectFilter';
import { colourOptions, flavourOptions } from './components/Select/docs/data';
import Button, { ButtonGroup } from './components/Button';
import Skeleton from './components/Skeleton';
import { SelectedProps } from './components/Select/Dropdown/Dropdown.d';
import { getIds } from './components/Select/Dropdown/getIds';

function App() {

  const {
    WithSelectFilter,
    methods,
  } = useSelectFilter([])

  const onSubmit = (data: any) => alert(`ready to save(data): ${JSON.stringify(data)}`)

  const onAction = React.useCallback((Set: any, [selected, setSelected]: SelectedProps,) => (e: React.MouseEvent<HTMLButtonElement>) => {

    const readyDeleteIDs = getIds(Set, selected).filter((v: string) => v !== 'disabled');

    alert(`ready to delete(rowID): ${readyDeleteIDs}`)
  }, [])

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
                selectActions: [
                  {
                    status: "warning",
                    statusIndex: 1,
                    action: onAction,
                    ActionElement: ({ onClick }: any) => <Button
                      text="Delete Warning" buttonColor="rgb(255, 173, 0)"
                      onClick={onClick} icon="Trashcan_white" />
                  },
                  {
                    status: "critical",
                    statusIndex: 1,
                    action: onAction,
                    ActionElement: ({ onClick }: any) => <Button
                      text="Delete Critical" buttonColor="var(--engineRed)"
                      onClick={onClick} icon="Trashcan_white" />
                  },
                ],
                thead: createTH(["Text", "Chip", "Icon", "Input", "Select", "Choice", "Copy",], "center", []),
                tbody: [
                  createTR(1, ["Hello World!",
                    <Chip status="normal" label="normal" />,
                    <Chip status="normal" label="normal" iconOnly />,
                    <Controller
                      name={`string`}
                      control={methods.control}
                      defaultValue={'test'}
                      rules={{
                        validate: () => {
                          return typeof methods.getValues("string") === "string";
                        }
                      }}
                      render={({ field }) => <Input {...field} placeholder="String input only" />}
                    />, <Controller
                      name="colour"
                      control={methods.control}
                      render={(field: any) =>
                        <Select id={"colour"}
                          {...{
                            field,
                            isVisible: true,
                            setValue: methods.setValue,
                            options: colourOptions,
                            defaultValue: colourOptions[0],
                            minWidth: 180,
                            placeholder: "備份時間",
                            checkedList: []
                          }}
                        />}
                    />], 'center'),
                  createTR(2, ["Hello World!",
                    <Chip status='warning' label='warning' />,
                    <Chip status='warning' label='warning' iconOnly />,
                    <Controller
                      name={`number`}
                      control={methods.control}
                      defaultValue={1000}
                      rules={{
                        validate: () => {
                          return !isNaN(parseInt(methods.getValues("number")));
                        }
                      }}
                      render={({ field }) => <Input {...field} type="number" placeholder="Number input only" />}
                    />,
                    <Controller
                      name="flavour"
                      control={methods.control}
                      render={(field: any) =>
                        <Select id={'flavour'}
                          {...{
                            field,
                            isVisible: true,
                            setValue: methods.setValue,
                            options: flavourOptions,
                            defaultValue: flavourOptions[0],
                            minWidth: 180,
                            placeholder: '備份時間',
                            checkedList: []
                          }}
                        />}
                    />], 'center'),
                  createTR(3, ["Hello World!",
                    <Chip status='critical' label='critical' />,
                    <Chip status='critical' label='critical' iconOnly />,
                    <Skeleton.Cell />,
                    <Skeleton.Cell />,], 'center'),
                  createTR(4, (Array.apply(null, new Array(5))).map(() => <Skeleton.Cell />), 'center'),
                  createTR(5, ["Hello World!",
                    <Chip status='critical' label='critical' />,
                    <Chip status='critical' label='critical' iconOnly />,
                    <Skeleton.Cell />,
                    <Skeleton.Cell />,], 'center'),
                  createTR(6, (Array.apply(null, new Array(5))).map(() => <Skeleton.Cell />), 'center'),
                  createTR(7, (Array.apply(null, new Array(5))).map(() => <Skeleton.Cell />), 'center'),
                  createTR(8, (Array.apply(null, new Array(5))).map(() => <Skeleton.Cell />), 'center'),
                  createTR(9, (Array.apply(null, new Array(5))).map(() => <Skeleton.Cell />), 'center'),
                ],
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
