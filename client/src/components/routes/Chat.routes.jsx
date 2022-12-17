import { Box, Typography } from "@mui/material";
import ChatPage from "../ChatPage.component";
import SearchIcon from "@mui/icons-material/Search";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Button from "../Button.component";
import { BUTTON_TYPE_CLASSES } from "../Button.component";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SearchAndGroupContainer,
} from "../../styles/ChatPage.styles";
import SearchBar from "../SearchBar.component";
import { plaster } from "../../styles/ColorTheme.styles";

function Chat() {
  return (
    <Box sx={{ marginTop: "56px" }}>
      <Box sx={SearchAndGroupContainer}>
        <SearchBar />
        <Button
          sx={{ top: "15px" }}
          buttonType={BUTTON_TYPE_CLASSES.create_group}
        >
          <GroupAddIcon />
        </Button>
      </Box>
      <ChatPage />
    </Box>
  );
}

export default Chat;
