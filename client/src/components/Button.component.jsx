import "../styles/Button.styles";

import { SignInButton, BaseButton } from "../styles/Button.styles.js";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  signIn: "sign_in",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.signIn]: SignInButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps} variant="contained" disableRipple>
      {children}
    </CustomButton>
  );
};

export default Button;
