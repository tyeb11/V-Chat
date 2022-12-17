import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 3,

    padding: "0 4px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    fontSize: "1.1rem",
    backgroundColor: "#B2473E",
    color: "#F4EADE",
  },
}));

function Notification() {
  return (
    <IconButton aria-label="notifications">
      <StyledBadge
        badgeContent={3}
        sx={{ color: "#F4EADE", "&:hover": { color: "#ED8C72" } }}
      >
        <ChatBubbleIcon sx={{ fontSize: "2rem" }} />
      </StyledBadge>
    </IconButton>
  );
}

export default Notification;
