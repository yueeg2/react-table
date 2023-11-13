"use client"
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { TRProps } from "../Table/table.d";
import { createTR } from "../Table/utils/mock";

export function Contacts(): unknown[] {
  return Array.apply({
    cells: {
      0: {
        align: "left",
        id: "0",
        label: <Cell />,
        rowID: 0,
      },
      1: {
        align: "left",
        id: "1",
        label: <Cell />,
        rowID: 1,
      }
    }
  }, new Array(4))
};

export function Cell({
  width = 400,
  component = 'td',
  lineHeight = 0.8 }: {
    width?: number | 'auto',
    component?: 'td' | 'div',
    lineHeight?: number
  }): JSX.Element {

  return <Typography
    sx={{ lineHeight: lineHeight }}
    width={width}
    component={component}
    variant={`h2`}>
    <Skeleton />
  </Typography>
};

export function Table({ length = 10 }: any): JSX.Element[] {
  return Array.apply(null, new Array(length)).map((v: any, i: number) =>
    <Typography component="tr" sx={{ backgroundColor: i % 2 ? 'var(--blueTheme)' : '#fff' }}>
      {Array.apply(null, new Array(15)).map((v: any, i: number) =>
        <Typography sx={{ lineHeight: 1.2 }}
          width={i === 1 ? 155 : 40}
          component="td"
          key={`enhance_h4_${i}`}
          variant={`h4`}>
          <Skeleton />
        </Typography>)}
    </Typography>)
};


export default { Contacts, Cell, Table }