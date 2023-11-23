<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const appStore = useAppStore();

const tagsViewStore = useTagsViewStore();

const userStore = useUserStore();

const route = useRoute();

const router = useRouter();

// 设备类型：desktop-宽屏设备 || mobile-窄屏设备
const { device } = storeToRefs(appStore);

// vueUse 全屏
const { isFullscreen, toggle } = useFullscreen();

/**
 * 注销
 */
function logout() {
    ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
       confirmButtonText: "确定",
       cancelButtonText: "取消",
       type: "warning", 
    }).then(() => {
        userStore.logout().then(() => {
            tagsViewStore.delAllViews();
        }).then(() => {
            router.push('/login?redirect=${route.fullPath}');
        })
    })
}
</script>


<template>
    <!-- 导航栏设置(窄屏隐藏) -->
    <div >
        <div>
            <svg-icon />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.setting-container {
    display: flex;
    align-items: center;
}
</style>