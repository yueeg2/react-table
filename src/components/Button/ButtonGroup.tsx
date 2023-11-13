import { ButtonGroupContainer, ButtonContainer } from "./Container";
import { Button as MuiButton } from '@mui/material';
import { ButtonGroupProps } from './Button.d'
import { SX } from './SX'


function createButtons({ items, variant, type }: ButtonGroupProps) {
  return <ButtonGroupContainer className="button-container" style={{ margin: 0 }}>
    {items?.map((item, i) => <ButtonContainer onClick={item?.onClick} key={`ButtonGroup-${i}`}>
      <MuiButton variant={variant} type={item?.type || type}
        sx={SX.ButtonGroup(item)}
      >
        {item.text
          ? <span>{item.text}</span>
          : null}
      </MuiButton>
    </ButtonContainer>)}

  </ButtonGroupContainer>;
};


const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  items,
  variant = 'contained',
  type = 'button'
}) => createButtons({ items, variant, type })


export default ButtonGroup