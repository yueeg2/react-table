import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse as MuiCollapse,
  createTheme,
  TableCell,
  TableRow as MuiTableRow,
  ThemeProvider
} from "@mui/material";
import { Flex } from '@chakra-ui/layout';

import Downline from './downline.svg'
import { createHeadCells } from "../Table.utils";
import { TableRowProps } from "../table.d";
import Tooltip from "@/components/Tooltip";




const CollapseTheme = (style?: {
  padding?: string, hover?: string,
  backgroundColor?: string
}, isChild?: boolean) => {
  if (!style) {
    return createTheme({})
  }
  const { padding, backgroundColor } = style
  return createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            ':nth-of-type(odd)': {
              backgroundColor: '#fff',
            },
            ':nth-of-type(odd):hover': {
              backgroundColor: '#fff',
            },
            [isChild ? ':nth-of-type(4n+3)' : ':nth-of-type(even)']: {
              backgroundColor: backgroundColor,
            },
            [isChild ? ':nth-of-type(4n+3):hover' : ':nth-of-type(even):hover']: {
              backgroundColor: backgroundColor,
            },
          },
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: padding,
            position: 'relative',

          }
        }
      }
    },
  })
};
const CollapseSection = ({ index, children, open }: { index?: number, children?: JSX.Element, open: boolean }) => {
  return <MuiTableRow key={`collapse-child-${index}`}>
    <TableCell style={{ padding: 0 }} colSpan={5} key={`collapse-child--${index}-cell`}>
      <MuiCollapse sx={{
        '.MuiCollapse-wrapper': {
          justifyContent: 'flex-end'
        }, '.MuiCollapse-wrapperInner': {
          width: '100%'
        }
      }}
        in={open} timeout="auto" unmountOnExit>
        <Box sx={{ marginInline: 1, paddingInlineStart: '23px' }}>
          <Flex >
            {children ? children : null}
          </Flex>
        </Box>
      </MuiCollapse>
    </TableCell>
  </MuiTableRow>
}

type TextType = string | JSX.Element | undefined;
type ChildRowCellsType = {
  [key: string]: {
    text: TextType,
    status: string
  }
}
// const createRowCells = (childRow: nodeResData[], index: number): Array<ChildRowCellsType> => {
//   let newChildRowFlat: ChildRowCellsType[] = [];

//   childRow?.length && childRow.map(({ services }: nodeResData, i: number) => {
//     let tmp: ChildRowCellsType = {};
//     if (index === i) {
//       services.map(({ service, description, status, raw_data }: nodeServicesProp) => {
//         tmp[service] = {
//           text: raw_data ? <Tooltip
//             placement='bottom' title={raw_data}>
//             <span style={{ textDecoration: 'underline' }}>{description}</span>
//           </Tooltip>
//             : description, status: status
//         }
//         return null;
//       })
//       newChildRowFlat.push(tmp)
//     }
//     return null;
//   });
//   return newChildRowFlat
// };

// interface CollapseRowProps extends TableRowProps {
//   isChild?: boolean;
//   childRow?: nodeResData[];
//   childHead?: string[];
//   index: number;
//   isCollapse?: boolean;
//   setCollapse?: any;
//   [key: string]: any;
// }

// export const Collapse = React.memo(function CollapseMemo({
//   isChild,
//   row,
//   style,
//   index,
//   childRow,
//   isCollapse,
//   childHead = ["cpu", "memory",
//     "system_disk", "data_disk", "elasticsearch", "logstash",
//     "kibana", "mariadb", "nginx", "lsync", "metricbeat",
//     "filebeat", "auditbeat"] }: CollapseRowProps) {

//   const [open, setOpen] = useState(false);

//   const onExtand = (event: any,) => {
//     if (event.target.localName === 'th'
//       || event.target.localName === 'td') {
//       setOpen(!open)
//     }
//   };

//   useEffect(() => {
//     !isCollapse && setOpen(false);
//   }, [isCollapse])

//   return <ThemeProvider
//     theme={CollapseTheme(style, isChild)}>
//     <MuiTableRow key={`collapse-${index}`}
//       hover
//       role="checkbox"
//       tabIndex={-1}
//       onClick={(event: any) => onExtand(event)}
//     >
//       {<TableCell key={`collapse-${index}-cell-Downicon`}
//         width={100}
//         align={'center'}
//       >{isChild ? <img style={{
//         position: 'relative',
//         width: 20,
//         display: 'block',
//         margin: '0 auto'
//       }}
//         src={Downline}
//         alt="down"
//         onClick={() => setOpen(!open)}></img>
//         : <></>}
//       </TableCell>}
//       {Object.entries(row)
//         .map(([label, val]: Array<any>, ind: number) => {
//           return <TableCell
//             key={`collapse-${index}-cell-${ind}`}
//             width={!ind ? 200 : 'fit-content'}
//             align={'left'}
//           > {/** align={column.align} */}
//             {val}
//           </TableCell>;
//         }).filter(x => x)}
//     </MuiTableRow>

//     {childRow && isChild
//       ? <CollapseSection index={index} open={isCollapse ? isCollapse : open}>
//         <Table.CollapseBase
//           index={index}
//           rows={createRowCells(childRow, index)}
//           headCells={createHeadCells(childHead)}
//           initOrder={childHead[0]} />
//       </CollapseSection>
//       : null}
//   </ThemeProvider>
// })

