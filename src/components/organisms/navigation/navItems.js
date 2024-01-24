import {
  DashboardOutlined,
  SaveOutlined,
  NodeIndexOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { USER_TIER } from "../../../libs/constants/global";

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
    title: "App Settings",
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
        // isNew: true,
        type: "item",
        url: "/proxy-gateway",
        icon: SaveOutlined,
        breadcrumbs: true,
      },
      {
        id: "malware-analyzer",
        title: "Malware Analyzer",
        showTitle: false,
        isNew: true,
        type: "item",
        url: "/malware-analyzer",
        allowedTiers: [USER_TIER.BUSINESS],
        icon: SaveOutlined,
        breadcrumbs: true,
      },
      {
        id: "api-configuration",
        title: "API configuration",
        subtitle: "Coming soon!",
        disabled: true,
        type: "item",
        allowedTiers: [USER_TIER.PRO, USER_TIER.BUSINESS],
        url: "/config",
        icon: NodeIndexOutlined,
        breadcrumbs: true,
      },
      {
        id: "account-details",
        title: "Account details",
        type: "item",
        url: "/account-details",
        icon: SettingOutlined,
        breadcrumbs: true,
        hidden: true,
      },
    ],
  },
];
