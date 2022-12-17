import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { color } from "@mui/system";

const stone = "#336b87";
const mist = "#90afc5";
const shadow = "#2a3132";
const autum = "#763626";

const coral = "#ED8C72";
const grecianBlue = "#2988BC";
const sea = "#2F496E";
const plaster = "#F4EADE";
const olive = "#ACBD78";
const tuscanRed = "#B2473E";

// THEME 51 Grecian Holiday

// #2988BC - Grecian Blue ---  chat and selected chat
// #2F496E - Sea          ---  header
// #F4EADE - Plaster      ---  chat pannel,header font color
// #ED8C72 - Coral        ---  profileBorder,signInButton,buttons

// #128277 - Deep Aqua    ---  accept buttons
//  or
// #506D2F - Leaves       ---  accept buttons
//  or
// #ACBD78 - Olive        ---  accept buttons [high priority]

// #B2473E - Tuscan Red   ---  cancel buttons

export const BaseButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,

  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {},
});

export const SignInButton = styled(BaseButton)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: coral,
  borderColor: plaster,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: coral,
    borderColor: coral,
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: coral,
    borderColor: coral,
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba( 237 ,140 ,114,.5)",
  },
});

export const GoogleSignInButton = styled(BaseButton)({
  backgroundColor: sea,
  fontSize: "1.2rem",
  color: plaster,

  border: `2px solid ${sea}`,

  "&:hover": {
    backgroundColor: coral,
    color: sea,
    border: `2px solid ${sea}`,
  },
});
export const GithubSignInButton = styled(GoogleSignInButton)({});
export const SignInFormButton = styled(GoogleSignInButton)({
  backgroundColor: coral,
  color: sea,
  border: `2px solid ${sea}`,
  "&:hover": {
    backgroundColor: sea,
    color: plaster,
    border: `2px solid ${sea}`,
  },
});

export const CancelButton = styled(BaseButton)({
  backgroundColor: plaster,
  color: tuscanRed,
  border: `3px solid ${tuscanRed}`,
  fontSize: "1.2em",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: tuscanRed,
    color: plaster,
  },
});
export const InvCancelButton = styled(BaseButton)({
  backgroundColor: plaster,
  color: shadow,
  border: `3px solid ${shadow}`,
  fontSize: "1.2em",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: shadow,
    color: plaster,
  },
});

export const CreateGroupButton = styled(GoogleSignInButton)({
  height: "100%",
  marginTop: "17px",
});
