<script setup lang="ts">
import { dataType } from 'element-plus/es/components/table-v2/src/common';
import { computed } from 'vue';

defineOptions({
    name: "Dashboard",
    inheritAttrs: false,
});


const date: Date = new Date();

const greetings = computed(() => {
    if (date.getHours() >= 6 && date.getHours() < 8) {
        return "晨起披衣出草堂，轩窗已自喜微凉！";
    } else if (date.getHours() >= 8 && date.getHours() < 12) {
        return "上午好！";
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
        return "下午好！";
    } else if (date.getHours() >= 18 && date.getHours() < 24) {
        return "晚上好！";
    } else if (date.getHours() >= 0 && date.getHours() < 6) {
        return "偷偷向银河要了一把碎星，只等你闭眼睛撒入你的梦中，晚安！";
    }
})
</script>

<template>
    <div class="loading-[40px]">{{ greetings }}</div>
</template>