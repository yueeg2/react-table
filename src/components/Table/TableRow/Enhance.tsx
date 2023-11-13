

import {
  createTheme,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";
import { useEffect, useState } from "react";
import { TableRowProps } from "../table.d";

const EnhanceTheme = (style?: {
  padding?: string,
  hover?: string,
  backgroundColor?: string,
  hoverHeight?: any
}) => {
  if (!style) {
    return createTheme({})
  }
  const { padding, hover, backgroundColor, hoverHeight } = style;
  return createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            ':nth-of-type(odd)': {
              backgroundColor: '#fff',
            },
            ':nth-of-type(even)': {
              backgroundColor: backgroundColor,
              ':hover': {
                backgroundColor: `${backgroundColor} !important`,
              }
            },
            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0) !important;'
            }
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: padding,
            position: 'relative',
            ':hover': {
              backgroundColor: 'rgba(16, 164, 185, 0)',
            },
            ':hover::after': {
              content: '""',
              position: 'absolute',
              backgroundColor: hover ? hover : 'rgba(16, 164, 185, 0.2)',
              left: 0,
              top: `-${hoverHeight.top}px`,
              height: hoverHeight.height,
              width: '100%',
              zIndex: 2,
            }
          }
        }
      }
    },
  })
};

// export const Enhance = ({ TR, style, ind }: TableRowProps) => {
//   const [hoverHeight, setHoverHeight] = useState({ height: 0 });
//   useEffect(() => {
//     const TableHeightquerySelector = document.querySelector('#PageContainer > form > div > div > section > div > div > div.MuiTableContainer-root.radius > table') as HTMLElement
//     const cellTopPosquerySelector = document.querySelector(`#PageContainer > form > div > div > section > div > div > div.MuiTableContainer-root.radius > table > tbody > tr:nth-child(${ind}) > td:nth-child(2)`) as HTMLElement
//     const headcellquerySelector = document.querySelector('#PageContainer > form > div > div > section > div > div > div.radius > table > thead > tr > th') as HTMLElement;
//     const TableHeight = TableHeightquerySelector.offsetHeight
//     const cellHeight = cellTopPosquerySelector.offsetHeight
//     const headcellHeight = headcellquerySelector.offsetHeight
//     hoverHeight?.height !== TableHeight && setHoverHeight(() => ({ top: (cellHeight * ind) + headcellHeight - cellHeight, height: TableHeight }))

//   }, [hoverHeight.height])

//   const genRows = () => {
//     return ["overview", "node", "cpu", "memory",
//       "system_disk", "data_disk", "elasticsearch", "logstash",
//       "kibana", "mariadb", "nginx", "lsync", "metricbeat",
//       "filebeat", "auditbeat"]
//       .map((key: string, ind: number) => {
//         const index: number = Object.entries(TR)
//           .findIndex((x: [string, string]) => {
//             return x[0] === key;
//           });
//         return index !== -1
//           ? <TableCell
//             key={`${key}-${ind}`}
//             width={ind === 1 ? 200 : 'fit-content'}
//             align={ind === 1 ? 'left' : 'center'}
//           > {/** align={column.align} */}
//             {Object.entries(TR)[index][1]}
//           </TableCell>
//           : <TableCell
//             key={`${key}-${ind}`}
//             width={ind === 1 ? 200 : 'fit-content'}
//             align={ind === 1 ? 'left' : 'center'}
//           > {/** align={column.align} */}
//           </TableCell>
//       })
//   }
//   return <ThemeProvider
//     theme={EnhanceTheme({ ...style, hoverHeight })}>
//     <MuiTableRow
//       hover
//       tabIndex={-1}
//     >
//       {genRows()}
//     </MuiTableRow>
//   </ThemeProvider>
// };
