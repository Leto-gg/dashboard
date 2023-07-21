import { MainDrawer } from "../components/organisms/mainDrawer";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";

// project import
import { AppHeader } from "../components/organisms/appHeader";
import Breadcrumbs from "../components/atoms/breadcrumbs";
import { navItems } from "../components/organisms/navigation/navItems";

// types
import { openDrawer } from "../libs/redux/slices/drawer.slice";

// css
import "./root.css";
import { useCallback } from "react";

export default function Root() {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.drawer);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = useCallback(() => {
    setOpen((open) => {
      const openToggled = !open;
      dispatch(openDrawer({ drawerOpen: openToggled }));
      return openToggled;
    });
    // needed to update content that needs resize event for responsiveness.
    window.dispatchEvent(new Event("resize"));
  }, [dispatch]);

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    setOpen((open) => (open !== drawerOpen ? drawerOpen : open));
  }, [drawerOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppHeader open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        <Breadcrumbs
          navigation={{
            items: navItems,
          }}
          title
        />
        <Outlet />
      </Box>
    </Box>
  );
}
