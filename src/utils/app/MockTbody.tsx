import React from 'react';
import Chip from '../../components/Chip';
import Input from '../../components/Input';
import Select from '../../components/Select/Dropdown';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { colourOptions, flavourOptions } from '../../components/Select/docs/data';
import Skeleton from '../../components/Skeleton';
import { createTR } from '../table';
import { TRProps } from '../table.d';

export const MockTbody = (
  methods: {
    control: Control<FieldValues> | undefined;
    getValues: (arg0: string) => string;
    setValue: any;
  }): TRProps[] => ([
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
        render={({ field }) => <Input {...field} placeholder="String input only" />} />,
      <Controller
        name="colour"
        control={methods.control}
        render={(field: any) => <Select id={"colour"}
          {...{
            field,
            isVisible: true,
            setValue: methods.setValue,
            options: colourOptions,
            defaultValue: colourOptions[0],
            minWidth: 180,
            checkedList: []
          }} />} />
    ], 'center'),
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
        render={({ field }) => <Input {...field} type="number" placeholder="Number input only" />} />,
      <Controller
        name="flavour"
        control={methods.control}
        render={(field: any) => <Select id={'flavour'}
          {...{
            field,
            isVisible: true,
            setValue: methods.setValue,
            options: flavourOptions,
            defaultValue: flavourOptions[0],
            minWidth: 180,
            checkedList: []
          }} />} />], 'center'),
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
  ]);
