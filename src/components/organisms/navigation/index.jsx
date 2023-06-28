// material-ui
import { Box, Typography } from "@mui/material";

// project import
import { NavGroup } from "../../molecules/navGroup";

//
import { DashboardOutlined } from "@ant-design/icons";
import { SimpleBarScroll } from "../simplebar";
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const navItems = [
  {
    id: "group-dashboard",
    title: "Navigation",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        url: "/",
        icon: DashboardOutlined,
        breadcrumbs: false,
      },
    ],
  },
];

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
