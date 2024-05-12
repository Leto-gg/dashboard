import { useState } from "react";

import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { APIKeyTab } from "./APIKeyTab";

const useTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event, tab) => {
    setActiveTab(tab);
  };

  const isTabActive = (_tab, index) => activeTab === index;

  return { activeTab, handleTabChange, isTabActive };
};

const apiTabs = [
  {
    label: "API Key",
    component: APIKeyTab,
  },
];

export function ApiConfiguration() {
  const { activeTab, handleTabChange, isTabActive } = useTabs();
  return (
    <Stack spacing={3}>
      <Tabs
        aria-label="API Configuration Tabs"
        value={activeTab}
        onChange={handleTabChange}
      >
        {apiTabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {apiTabs.map((tab, index) => (
        <Stack key={index} hidden={isTabActive(tab, index)}>
          <tab.component />
        </Stack>
      ))}
    </Stack>
  );
}
