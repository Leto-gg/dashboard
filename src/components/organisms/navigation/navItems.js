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
        isNew: false,
        type: "item",
        url: "/malware-analyzer",
        allowedTiers: [USER_TIER.BUSINESS],
        icon: SaveOutlined,
        breadcrumbs: true,
      },
      {
        id: "api-configuration",
        title: "API Configuration",
        isNew: true,
        disabled: false,
        type: "item",
        allowedTiers: [USER_TIER.BUSINESS],
        url: "/api-configuration",
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
