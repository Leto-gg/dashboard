// material-ui
import { Box, Typography } from "@mui/material";

// project import
import { NavGroup } from "../../molecules/navGroup";

//
import { SimpleBarScroll } from "../simplebar";
import { navItems } from "./navItems";
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

function DrawerContent() {
  const navGroups = navItems.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}

export function Navigation() {
  return (
    <SimpleBarScroll
      sx={{
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DrawerContent />
    </SimpleBarScroll>
  );
}
