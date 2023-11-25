import { ButtonProps as MuiButtonProps } from '@mui/material'
export type TooltipContainerProps = {
  position?: 'relative' | 'absolute';
  left?: string;
  top?: string;
  isSelected?: boolean;
  text?: string;
  align?: 'left' | 'middle' | 'right';
  color?: '--mediumGreenColor' | '--darkGrayColor' | '--deleteColor';
  type?: 'submit' | 'button';
  [key: string]: any;
}

type IconSelected = `${string}_white` 
type ArchiveIcon = 'backup-auto' | 'backup-list' | 'backup-manual' | 'backup-status' | 'host-setting' | 'self-monitoring' | 'Backup-log' | 'Null' | 'Processing';
type SelfmoinitorIcon = 'Pen' | 'Plus' | 'Restart' | 'Copy' | 'Cross' | 'Email' | 'Run-Script' | 'Script' | 'Trashcan';
type SystemSettingIcon = 'system-setting' | 'timezone' | 'connect-setting';
type DataQueueIcon = 'daily-setting' | 'topiclist';
type DefaultIcon =  'Trashcan' | 'Disable'
export type IconName = undefined | IconSelected | ArchiveIcon | SelfmoinitorIcon | DataQueueIcon | DefaultIcon | SystemSettingIcon

export interface ButtonProps extends MuiButtonProps {
  icon?: IconName
  tooltip?: string
  text?: string
  value?: boolean
  buttonColor?: string
  radius?: boolean
  padding?: string
}

export interface ButtonGroupProps extends MuiButtonProps {
  items?: Array<ItemsOfButtomGroup>,
}

export interface ItemsOfButtomGroup {
  text: string,
  buttonColor: string,
  position: number
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: "button" | "submit" | "reset",
}