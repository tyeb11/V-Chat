import "../styles/Button.styles";

import {
  SignInButton,
  BaseButton,
  GoogleSignInButton,
  GithubSignInButton,
  CancelButton,
  InvCancelButton,
  SignInFormButton,
} from "../styles/Button.styles.js";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  signIn: "sign_in",
  google_signin: "google_signin",
  github_signin: "github_signin",
  cancel: "cancel",
  invcancel: "inv_cancel",
  sign_in_form_submit: "sign_in_form_submit",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.signIn]: SignInButton,
    [BUTTON_TYPE_CLASSES.google_signin]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.github_signin]: GithubSignInButton,
    [BUTTON_TYPE_CLASSES.cancel]: CancelButton,
    [BUTTON_TYPE_CLASSES.invcancel]: InvCancelButton,
    [BUTTON_TYPE_CLASSES.sign_in_form_submit]: SignInFormButton,
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
