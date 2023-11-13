import { ChipStatus } from "./ChipProps.d";

const STATUS_COLOR = {
  OK: { BACKGROUND: 'rgb(245,255,240)', FONT: 'rgb(78, 149, 42)', BORDER: 'rgb(78, 149, 42)' },
  FAILED: { BACKGROUND: 'rgb(255,243,243)', FONT: 'rgb(200, 46, 46)', BORDER: 'rgb(200, 46, 46)' },
  SAVING: { BACKGROUND: 'rgb(255,244,220)', FONT: 'rgb(199, 135, 0)', BORDER: 'rgb(255, 173, 0)' },
  RESTORING: { BACKGROUND: 'rgb(255,244,220)', FONT: 'rgb(199, 135, 0)', BORDER: 'rgb(255, 173, 0)' },
  available: { BACKGROUND: '#E0F3FF', FONT: '#4c7e9f', BORDER: '#4c7e9f' },

}
const RESULT_COLOR = {
  success: { BACKGROUND: 'rgb(245,255,240)', FONT: 'rgb(78, 149, 42)', BORDER: 'rgb(78, 149, 42)' },
  complete: { BACKGROUND: 'rgb(245,255,240)', FONT: 'rgb(78, 149, 42)', BORDER: 'rgb(78, 149, 42)' },
  saving: { BACKGROUND: 'rgb(255,244,220)', FONT: 'rgb(199, 135, 0)', BORDER: 'rgb(255, 173, 0)' },
  failed: { BACKGROUND: 'rgb(255,243,243)', FONT: 'rgb(200, 46, 46)', BORDER: 'rgb(200, 46, 46)' },
}

const COLOR_MAP = {
  critical: { BACKGROUND: 'rgb(255,243,243)', FONT: 'rgb(200, 46, 46)', BORDER: 'rgb(200, 46, 46)' },
  warning: { BACKGROUND: 'rgb(255,244,220)', FONT: 'rgb(199, 135, 0)', BORDER: 'rgb(255, 173, 0)' },
  normal: { BACKGROUND: 'rgb(245,255,240)', FONT: 'rgb(78, 149, 42)', BORDER: 'rgb(78, 149, 42)' },
  ok: { BACKGROUND: 'rgb(245,255,240)', FONT: 'rgb(78, 149, 42)', BORDER: 'rgb(78, 149, 42)' },
  null: { BACKGROUND: '#E0F3FF', FONT: '#4c7e9f', BORDER: '#4c7e9f' },
  processing: { BACKGROUND: 'rgb(255,244,220)', FONT: 'rgb(199, 135, 0)', BORDER: 'rgb(255, 173, 0)' },
  ...RESULT_COLOR,
  ...STATUS_COLOR
}

export const container = (status: ChipStatus) => ({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  width: 'max-content',
  borderRadius: 100,
  paddingInlineStart: 8,
  paddingBlock: 5,
  backgroundColor: COLOR_MAP[status as keyof typeof COLOR_MAP]?.BACKGROUND || 'rgb(255,243,243)',
  border: `1px solid ${COLOR_MAP[status as keyof typeof COLOR_MAP]?.BORDER || 'rgb(112, 112, 112)'}` ,
});
export const font = (status: ChipStatus) => ({
  fontSize: 14,
  fontWeight: 'var(--fwS)',
  padding: COLOR_MAP[status as keyof typeof COLOR_MAP] ? 4 : 8,
  color: COLOR_MAP[status as keyof typeof COLOR_MAP]?.FONT || 'rgb(112, 112, 112)',
  paddingInline: COLOR_MAP[status as keyof typeof COLOR_MAP] ? 16 : 5,
});
export const img = ({
  minWidth: 25,
  minHeight: 25,
});
