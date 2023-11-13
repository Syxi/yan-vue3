import defaultSettings from "@/api/settings/settings";
import { en, zhCn } from "element-plus/es/locale";
import { defineStore } from "pinia";


export const useAppStore = defineStore("app", () => {
    // state
    const device = useStorage("device", "desktop");

    const size = useStorage<any>("size", defaultSettings.size);

    const language = useStorage("language", defaultSettings.language);

    const sidebarStatus = useStorage("sidebarStatus", "closed");

    const sidebar = reactive({
        opened: sidebarStatus.value !== "closed",
        withoutAnimation: false,
    });

    const activeTopMenu = useStorage("activeTop", "");

    // 根据语言标识读取对应的语言包
    const locale = computed(() => {
        if (language?.value == "en") {
            return en;
        } else {
            return zhCn;
        }
    });


    // actions
    function toggleSidebar() {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = false;
        if (sidebar.opened) {
            sidebarStatus.value = "opened";
        } else {
            sidebarStatus.value = "closed";
        }
    }


    function closeSideBar(withoutAnimation: boolean) {
        sidebar.opened = false;
        sidebar.withoutAnimation = withoutAnimation;
        sidebarStatus.value = "closed";
    }


    function openSideBar(withoutAnimation: boolean) {
        sidebar.opened = true;
        sidebar.withoutAnimation = withoutAnimation;
        sidebarStatus.value = "opened";
    }


    function toggleDevice(val: string) {
        device.value = val;
    }
    

    function changeSize(val: string) {
        size.value = val;
    }


    function changeLanguage(val: string) {
        language.value = val;
    }


    function changeTopActive(val: string) {
        activeTopMenu.value = val;
    }



    return {
        device,
        size,
        language,
        sidebarStatus,
        sidebar,
        locale,
        toggleSidebar,
        closeSideBar,
        openSideBar,
        toggleDevice,
        changeSize,
        changeLanguage,
        changeTopActive
    }

})