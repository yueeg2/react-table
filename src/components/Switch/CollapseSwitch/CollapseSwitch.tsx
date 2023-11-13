import SwitchBase from '../SwitchBase'
import { SwitchProps } from '@mui/material/Switch';

interface CollapseSwitchProps extends SwitchProps {
  handleAllCollapse: (value: boolean) => void
}

const CollapseSwitch = (({ handleAllCollapse }: CollapseSwitchProps) => {
  return (
    <SwitchBase labelL="一鍵收合" labelR="全部展開" handleOnChange={handleAllCollapse} />
  )
})

export default CollapseSwitch