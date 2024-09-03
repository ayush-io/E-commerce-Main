import React, { useState } from "react";
import { styled, ListItem, ListItemText } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import SubMenuDropdown from "./SubMenuDropdown";

const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  textAlign: "center",
  color: "white",
}));

function MenuItems({ item, depth, handler }) {
  const [showMenu, setShowMenu] = useState(false);

  return item.submenu ? (
    <StyledMenuItem
      sx={{
        position: "relative",
        cursor: "pointer",
        ":hover": { bgcolor: "Highlight" },
      }}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <ListItemText>{item.name}</ListItemText>
      {depth > 1 ? <KeyboardArrowRight /> : <KeyboardArrowDown />}
      <SubMenuDropdown
        submenu={item.submenu}
        depth={depth}
        showMenu={showMenu}
      />
    </StyledMenuItem>
  ) : (
    <StyledMenuItem
      onClick={() => handler(item.slug)}
      sx={{ cursor: "pointer", ":hover": { bgcolor: "Highlight" } }}
    >
      <ListItemText>{item.name}</ListItemText>
    </StyledMenuItem>
  );
}

export default MenuItems;
