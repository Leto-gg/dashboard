import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useTabs } from "../../hooks/useTabs";

import { APIKeyTab } from "./APIKeyTab";

const apiTabs = [
  {
    label: "API Key",
    component: APIKeyTab,
  },
];

const DEFAULT_TAB_INDEX = 0;

export function ApiConfiguration() {
  const { activeTab, handleTabChange } = useTabs(DEFAULT_TAB_INDEX, apiTabs);

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
      {apiTabs.map((tab, index) => {
        const TabComponent = tab.component;
        return (
          <Stack key={index} hidden={index !== activeTab}>
            <TabComponent />
          </Stack>
        );
      })}
    </Stack>
  );
}
