<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { useCounterStore } from "@/store/counter";

const counterStore = useCounterStore();
const open = () => {
  ElMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary" @click="open">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button type="danger"
      ><svg-icon icon-class="bug" />SVG 本地图标</el-button
    >
    <el-checkbox label="Option 1" size="large" />
    <el-icon>
      <i-ep-Delete />
    </el-icon>
    <el-button type="primary">
      <el-icon style="vertical-align: middle">
        <i-ep-Search />
      </el-icon>
    </el-button>
    <el-icon><i-ep-Delete /></el-icon>
  </el-row>
  <div class="box"></div>
  <h1 class="text-blue">UnoCSS</h1>

  <br />
  <h1 class="text-amber">父组件</h1>
  <el-button type="primary" @click="counterStore.increment">count++</el-button>
  <br />
  <HelloWorld />
  <el-table style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
@/store/counter
