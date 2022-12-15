import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "../Button.component";
import { BUTTON_TYPE_CLASSES } from "../Button.component";
import BsGoogle from "@mui/icons-material/Google";
import BsGithub from "@mui/icons-material/GitHub";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import KeyboardArrowUpIcon from "@mui/icons-material/PanToolAlt";
import {
  style,
  cancelContainer,
  buttonContainer,
  headingContainer,
  createAccountForm,
  createAccountInputFields,
  createAccountSubmitButton,
  logInAccountForm,
  logInAccountInputFields,
  logInAccountSubmitButton,
} from "../../styles/SignInModal.styles";

function SignInModal(props) {
  const handleGoogle = () => {
    window.location = "/api/auth/google";
  };
  const handleGithub = () => {
    window.location = "/api/auth/github";
  };
  const handleModal = () => {
    if (props.sign_in_modal) {
    } else if (props.cart_modal) {
    } else {
    }
  };
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={() => handleModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <Box sx={headingContainer}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Log in" value={1} />
                    <Tab label="create account  " value={2} />
                  </TabList>
                </Box>
                <TabPanel value={1}>
                  <Box sx={createAccountForm}>
                    <Box sx={createAccountInputFields}>
                      <TextField
                        helperText="Please enter your email"
                        id="demo-helper-text-aligned"
                        label="Email"
                      />
                      <TextField
                        helperText="Please enter your password"
                        id="demo-helper-text-aligned"
                        label="Password"
                      />
                    </Box>
                    <Box sx={createAccountSubmitButton}>
                      <Button
                        endIcon={<KeyboardArrowUpIcon />}
                        buttonType={BUTTON_TYPE_CLASSES.sign_in_form_submit}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value={2}>
                  <Box sx={logInAccountForm}>
                    <Box sx={logInAccountInputFields}>
                      <TextField
                        helperText="Please enter your user name"
                        id="demo-helper-text-aligned"
                        label="User Name"
                      />
                      <TextField
                        helperText="Please enter your email"
                        id="demo-helper-text-aligned"
                        label="Email"
                      />
                      <TextField
                        helperText="Please enter your password"
                        id="demo-helper-text-aligned"
                        label="Password"
                      />
                    </Box>
                    <Box sx={logInAccountSubmitButton}>
                      <Button
                        endIcon={<KeyboardArrowUpIcon />}
                        buttonType={BUTTON_TYPE_CLASSES.sign_in_form_submit}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
            <Box sx={buttonContainer}>
              <Button
                startIcon={<BsGoogle />}
                buttonType={BUTTON_TYPE_CLASSES.google_signin}
                onClick={() => handleGoogle()}
              >
                Google
              </Button>
              <Button
                startIcon={<BsGithub />}
                buttonType={BUTTON_TYPE_CLASSES.github_signin}
                onClick={() => handleGithub()}
              >
                Github
              </Button>
            </Box>
            <Box sx={cancelContainer}>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.cancel}
                onClick={() => handleModal()}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignInModal;
