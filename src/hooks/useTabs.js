import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * @param {string} label
 */
function getTabNameFromLabel(label) {
  return label.toLowerCase().replace(" ", "-");
}

export function useTabs(defaultTab, tabItems) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => defaultTab);

  const handleTabChange = (_event, tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // If no tab is selected, select the default tab
    if (!searchParams.get("tab") && tabItems[activeTab] != null) {
      const tabName = getTabNameFromLabel(tabItems[activeTab].label);
      setSearchParams({ tab: tabName });
    } else {
      // Otherwise, select the tab from the URL
      const selectedTab = tabItems.findIndex(
        (tab) => getTabNameFromLabel(tab.label) === searchParams.get("tab")
      );
      setActiveTab((_prevTab) => {
        // if the selected tab is invalid, keep the current tab
        if (selectedTab === -1 || selectedTab === _prevTab) {
          const tabName = getTabNameFromLabel(tabItems[_prevTab].label);
          setSearchParams({
            tab: tabName,
          });
          return defaultTab;
        }
        // otherwise, update the selected tab to the tab from the URL
        const tabName = getTabNameFromLabel(tabItems[selectedTab].label);
        setSearchParams({
          tab: tabName,
        });
        return selectedTab;
      });
    }
  }, [activeTab, searchParams, setSearchParams, tabItems, defaultTab]);

  return { activeTab, handleTabChange };
}
