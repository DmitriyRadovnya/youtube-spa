import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../rtk/store";
import { signOut } from "../rtk/authSlice";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  return (
    <>
      <AppBar position="sticky" elevation={10} square={false} sx={{ p: 1 }}>
        {isAuth ? (
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <IconButton>
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Введите запрос"
              variant="standard"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            ></TextField>
            <Box sx={{ display: "flex" }}>
              <IconButton>
                <StarBorderIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={() => dispatch(signOut())}>
                <LogoutIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        ) : (
          <Typography variant="h4">YouTube</Typography>
        )}
      </AppBar>
      <Outlet />
    </>
  );
};
