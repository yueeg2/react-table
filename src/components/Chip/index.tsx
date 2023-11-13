"use client"
import Stack from "@mui/material/Stack";
import * as Style from "./style";
import Tooltip from "../Tooltip";
import { type ChipProps } from "./ChipProps";


export default function Chip({ status, iconOnly, text }: ChipProps) {
  const PublicUrl = process.env.DEV || ''
  return (
    <Stack direction="row" spacing={1} sx={iconOnly ? { display: 'flex', justifyContent: 'center' } : {}}>
      <div style={iconOnly ? {} : Style.container(status)}>
        {iconOnly
          ? <Tooltip placement='bottom-start' title={status}>
            <img style={Style.img} src={`${PublicUrl}/assets/${status}.svg`} alt={status} />
          </Tooltip>
          : <>
            <img style={Style.img} src={`${PublicUrl}/assets/${status}.svg`} alt={status} />
            <span style={Style.font(status)}>
              {text ? text : status.toLocaleUpperCase()}&nbsp;
            </span>
          </>
        }
      </div>
    </Stack >
  );
}
