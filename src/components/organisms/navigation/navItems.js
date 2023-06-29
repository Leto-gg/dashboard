import {
  DashboardOutlined,
  SaveOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";

export const navItems = [
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
  {
    id: "group-settings",
    title: "Settings",
    type: "group",
    children: [
      {
        id: "api-configuration",
        title: "API configuration",
        type: "item",
        url: "/config",
        icon: NodeIndexOutlined,
        breadcrumbs: true,
      },
      {
        id: "cid-configuration",
        title: "CIDs",
        subtitle: "coming soon",
        disabled: true,
        type: "item",
        url: "/cids",
        icon: SaveOutlined,
        breadcrumbs: true,
      },
    ],
  },
];
