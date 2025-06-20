import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import LanguageToggle from "./LanguageToggle";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { language } = useSelector((state: RootState) => state.language);
  const pages =
    language === "tr-TR"
      ? ["Filmler", "Diziler"]
      : ["Movies", "Series"];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page: string) => {
    if (page === "Diziler" || page === "Series") {
      navigate("/series");
    } else if (page === "Filmler" || page === "Movies") {
      navigate("/");
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        p: 2,
        zIndex: 100,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            onClick={() => handlePageClick(pages[0])}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", alignItems: "center", gap: 4 },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#ff4a4a",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                color: "#ff4a4a",
              },
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            CineFusion
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#e08181" }}
            >
              <FaBars />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                },
              }}
            >
              <MenuItem sx={{ p: 2 }}>
                <SearchBar />
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handlePageClick(page);
                  }}
                >
                  <Typography sx={{ color: "#8E1616", textAlign: "center" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
                          sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                justifyContent: { xs: "flex-start", sm: "center" },
                ml: { xs: 2, sm: 0 },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#ff4a4a",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                "&:hover": {
                  color: "#D84040",
                },
              }}
          >
            CineFusion
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  handlePageClick(page);
                }}
                sx={{
                  my: 2,
                  color: "#ff4a4a",
                  display: "block",
                  "&:hover": {
                    color: "#D84040",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchBar />
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <LanguageToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
