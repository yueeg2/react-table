
import React from "react";

import { Button as MuiButton } from "@mui/material";
import { ButtonProps, IconName } from "./Button.d"
import { SX } from "./SX";
import { ButtonContainer } from "./Container";


const Icon: React.FunctionComponent<{ iconName: IconName, text?: string }> = React.memo(({
  iconName,
  text
}) => {

  const PublicUrl = process.env.DEV || "";
  const filename = iconName?.toLocaleLowerCase();
  return (
    <div style={{ padding: '0 5px 0 0' }}>
      <div
        className='icon-container'
        style={{
          minWidth: 'fit-content',
          backgroundImage: `url(${PublicUrl}/assets/${filename}.svg)`,
        }}
        aria-label={filename}
      >
        {text && (
          <div
            className='hover_img'
            style={{
              backgroundImage: `url(${PublicUrl}/assets/${filename}_white.svg)`,
            }}
            aria-label={filename}
          ></div>
        )}
      </div>
    </div>
  )
})

function createButton({ icon, text, value, buttonColor, variant, radius, type, style, padding }: ButtonProps) {

  return ({ onClick, tooltip }: ButtonProps): JSX.Element => {
    return <ButtonContainer {...{
      className: "button-container",
      onClick,
      tooltip,
      style
    }}>
      <MuiButton {...{
        variant,
        type,
        sx: SX.IconButton(value, variant, buttonColor, radius, padding)
      }}>
        {icon
          ? <Icon iconName={value ? `${icon}_white` : icon} {...{ text }} />
          : null}
        {text
          ? <span>{text}</span>
          : null}
      </MuiButton>
    </ButtonContainer>;
  };
};

const Button: React.FunctionComponent<ButtonProps> = ({
  style,
  onClick,
  tooltip,
  icon,
  text,
  buttonColor,
  variant,
  value = false,
  radius = false,
  type = 'button',
  padding,
}) => createButton({ icon, text, value, buttonColor, variant, radius, type, style, padding })({ onClick, tooltip })

export default Button