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
        id: "cid-configuration",
        title: "CIDs",
        showTitle: false,
        type: "item",
        url: "/cids",
        icon: SaveOutlined,
        breadcrumbs: true,
      },
      {
        id: "proxy-gateway",
        title: "Proxy gateway",
        showTitle: false,
        isNew: true,
        type: "item",
        url: "/proxy-gateway",
        icon: SaveOutlined,
        breadcrumbs: true,
      },
      {
        id: "api-configuration",
        title: "API configuration",
        subtitle: "Coming soon!",
        disabled: true,
        type: "item",
        url: "/config",
        icon: NodeIndexOutlined,
        breadcrumbs: true,
      },
    ],
  },
];
