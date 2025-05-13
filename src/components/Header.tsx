import { AppBar, Toolbar, Typography } from "@mui/material";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CineFusion
        </Typography>
        <LanguageToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
