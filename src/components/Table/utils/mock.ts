import { TRKey, TRProps } from "../table.d";

export const createTR = (rowID: number, Items: Array<unknown>, align: 'center' | 'left', disabledSelect?: boolean, inputDate?: boolean): TRProps => {
  //TODO
  const TRCell: any = Object.assign({}, Items.map((item: unknown, i) => {
    return ({ id: `${i}`, label: item, align: align, rowID: rowID })
  }))
  //console.log(typeof TRCell, TRCell)

  const result: { [key in TRKey]: any } = {

    [disabledSelect ? "disabled" : "cells"]: TRCell,
  }
  return result
};


export const createTH = (
  Items: Array<string>,
  align: 'center' | 'left',
  hidden?: string[]
) => {
  return Items && Items.map((item: string, i) => ({
    id: `${i}`, label: item, hidden: hidden?.includes(item) || false, align: align
  }))
};
