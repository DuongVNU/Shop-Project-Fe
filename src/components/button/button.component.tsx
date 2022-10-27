import {BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton} from './button.styles'
import {FC, ButtonHTMLAttributes} from 'react';

export enum BUTTON_TYPE_CLASS {
  google = 'google-authentication',
  inverted = 'inverted',
  base = 'base'
}

// WARNING: Tìm hiểu typeof trong Type Script

const getButton = (buttonType = BUTTON_TYPE_CLASS.base): typeof BaseButton => (
  {
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton
  }[buttonType]
)

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASS;
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
                                   children,
                                   buttonType,
                                   isLoading,
                                   ...otherProps
                                 }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
}




export default Button;
