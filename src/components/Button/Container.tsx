
import React from 'react';
import Stack from '@mui/material/Stack';
import { TooltipContainerProps } from './Button.d';
import Tooltip from '../Tooltip';

export const ButtonContainer: React.FunctionComponent<TooltipContainerProps> = ({
  onClick, tooltip, children, ...props
}) => <Stack {...props} {...{
  direction: "row",
  spacing: 0.8,
  onClick,
  sx: { minHeight: 42, minWidth: 42 }
}}>{
      tooltip
        ? <Tooltip
          placement='bottom-start'
          title={tooltip ? tooltip : '編輯'}>
          {children}
        </Tooltip>
        : children
    }</Stack>;


export const ButtonGroupContainer: React.FunctionComponent<TooltipContainerProps> = ({
  onClick, children, ...props
}) => <Stack {...props} {...{
  direction: "row",
  spacing: 0.8,
  onClick,
  sx: {
    minHeight: 42,
    maxHeight: 42,
    position: 'fixed',
    top: 0, right: 0, zIndex: 60
  }
}}>{children}</Stack>;
