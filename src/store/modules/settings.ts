import { defineStore } from "pinia";
import defaultSettings from "@/settings/settings";

export const useSettingsStore = defineStore("setting", () => {
  // state
  const title = defaultSettings.title;

  const version = defaultSettings.version;

  const tagsView = useStorage<boolean>("tagsView", defaultSettings.tagsView);

  const showSettings = ref<boolean>(defaultSettings.showSettings);

  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo);

  const fixedHeader = useStorage<boolean>(
    "fixedHeader",
    defaultSettings.fixedHeader
  );

  const layout = useStorage<string>("layout", defaultSettings.layout);

  const themeColor = useStorage<string>(
    "themeColor",
    defaultSettings.themeColor
  );

  const theme = useStorage<string>("theme", defaultSettings.theme);

  const watemark = useStorage<any>("watemark", defaultSettings.watermark);

  const settingMap: Record<string, Ref<any>> = {
    tagsView,
    showSettings,
    sidebarLogo,
    fixedHeader,
    layout,
    themeColor,
    theme,
    watemark: watemark.value,
  };

  // actions
  function changeSetting({ key, value }: { key: string; value: any }) {
    const setting = settingMap[key];
    if (setting !== undefined) {
      setting.value = value;
      if (key === "theme" && value === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  return {
    title,
    version,
    tagsView,
    showSettings,
    sidebarLogo,
    fixedHeader,
    layout,
    themeColor,
    theme,
    watemark,
    changeSetting,
  };
});
