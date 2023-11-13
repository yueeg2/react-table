import {
  Tooltip as MuiTooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Zoom from '@mui/material/Zoom';


const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    minHeight: 'auto',
  },
});

export default function Tooltip({
  placement,
  title,
  children }: TooltipProps) {
  return <CustomTooltip arrow enterDelay={200} leaveDelay={0}
    disableInteractive TransitionComponent={Zoom}
    title={title} placement={placement}
  >
    {children}
  </CustomTooltip>
}
