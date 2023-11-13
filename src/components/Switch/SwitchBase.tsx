import Stack from '@mui/material/Stack';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface SwitchBaseProps extends SwitchProps {
  labelL: string,
  labelR: string,
  handleOnChange: (value: any) => void,
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  borderRadius: 16 / 2,
  boxShadow: '0 2px 9px 1px rgb(0 35 11 / 30%)',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#d9ebf3',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 5px 10px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0a2d43',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#d9ebf3',
    boxSizing: 'border-box',
  },
}));

const SwitchBase = (({ labelL, labelR, handleOnChange }: SwitchBaseProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
      <Typography>{ labelL }</Typography>
      <AntSwitch onChange={handleOnChange} />
      <Typography>{ labelR }</Typography>
    </Stack>
  )
})

export default SwitchBase;