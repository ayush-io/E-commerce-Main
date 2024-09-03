import React from "react";
import {
  styled,
  alpha,
  InputBase,
  useAutocomplete,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: "auto",
  },
  [theme.breakpoints.up("xl")]: {
    marginLeft: theme.spacing(15),
    marginRight: theme.spacing(15),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "10ch",
      "&:focus": {
        width: "20ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
    [theme.breakpoints.up("lg")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
  [theme.breakpoints.up("xs")]: {
    width: "60vw",
    left: "-50%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    left: 0,
  },
}));

export default function SearchField({ searchItems }) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: searchItems,
    getOptionLabel: (option) => option.title,
  });

  return (
    <div {...getRootProps()}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ ...getInputProps() }}
        />
        {groupedOptions.length > 0 ? (
          <Listbox sx={{ zIndex: 999, width: "100%" }} {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <ListItem
                  style={{ color: "black" }}
                  key={`${option.title}-${index}`}
                  {...optionProps}
                >
                  {option.title}
                </ListItem>
              );
            })}
          </Listbox>
        ) : null}
      </Search>
    </div>
  );
}
