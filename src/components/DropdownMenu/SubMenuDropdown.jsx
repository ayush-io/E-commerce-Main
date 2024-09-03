import React from "react";
import MenuItems from "./MenuItems";
import { List, styled } from "@mui/material";

function SubMenuDropdown({ submenu, depth, showMenu }) {
  const StyledSubMenu = styled(List)(({ theme }) => ({
    display: `${showMenu ? "flex" : "none"}`,
    position: "absolute",
    flexDirection: "column",
    top: `${depth > 1 ? "0%" : "100%"}`,
    left: `${depth > 1 ? "100%" : "0%"}`,
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <StyledSubMenu sx={{ boxShadow: "2px 2px 5px rgb(0,0,0,0.5)" }}>
      {submenu.map((menu, index) => (
        <MenuItems item={menu} depth={depth + 1} key={index} />
      ))}
    </StyledSubMenu>
  );
}

export default SubMenuDropdown;
