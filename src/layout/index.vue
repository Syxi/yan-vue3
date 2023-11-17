<<<<<<< HEAD
<script setup>

</script>



<template>
    <div class="settings-container">
       <h3 class="text-base font-bold">项目配置</h3> 

       <el-divider>界面设置</el-divider>
       <div class="py-[8px] flex justify-between">
          <span class="text-xs">开启 TagsView</span>
          <el-switch />
       </div>

       <div class="py-[8px] flex justify-between">
          <span class="text-xs">固定 Header</span>
          <el-switch/>
       </div>

       <div class="py-[8px] flex justify-between">
          <span class="text-xs">侧边栏 Logo</span>
=======
<template>
    <div>
       <h3>项目配置</h3> 

       <el-divider>界面设置</el-divider>
       <div>
          <span>开启 TagsView</span>
          <el-switch />
       </div>

       <div>
          <span>固定 Header</span>
          <el-switch/>
       </div>

       <div>
          <span>侧边栏 Logo</span>
>>>>>>> 703cb404e78bd3651b29bf4099e9d244b52dcd33
          <el-switch/>
       </div>

       <el-divider>主题颜色</el-divider>
<<<<<<< HEAD
       <ul class="w-full space-x-2 flex justify-center py-2">
        <li class="inline-block w-[30px] h-[30px] cursor-pointer theme-wrap">
=======
       <ul>
        <li>
>>>>>>> 703cb404e78bd3651b29bf4099e9d244b52dcd33
          <i-el-check/>
        </li>
       </ul>

       <el-divider>导航设置</el-divider>

<<<<<<< HEAD
       <ul class="layout">
         <el-tooltip content="左侧模式" placement="bottom">
            <li >
               <div></div>
               <div></div>
            </li>
         </el-tooltip>
         <el-tooltip content="顶部模式" placement="bottom">
            <li >
               <div></div>
               <div></div>
            </li>
         </el-tooltip>
         <el-tooltip content="混合模式" placement="bottom">
            <li >
               <div></div>
               <div></div>
            </li>
         </el-tooltip>
       </ul>

    </div>
</template>


<style lang="scss" scoped>
.settings-container {
   padding: 16px;

   .layout {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
      height: 50px;


      &-item {
         position: relative;
         width: 18%;
         height: 45px;
         overflow: hidden;
         cursor: pointer;
         background: #f0f2f5;
         border-radius: 4px;
      }

      &-item.is-active {
         border: 2px solid var(--el-color-primary);
      }

      &-mix div:nth-child(1) {
         width: 100%;
         height: 30%;
         background: #1b2a47;
         box-shadow: 0 0 1px #888;
      }

      &-mix div:nth-child(2) {
         position: absolute;
         bottom: 0;
         left: 0;
         width: 30%;
         height: 70%;
         background: #1b2a47;
         box-shadow: 0 0 1px #888;
      }

      &-top div:nth-child(1) {
         width: 100%;
         height: 30%;
         background: #1b2a47;
         box-shadow: 0 0 1px #888;
      }

      &-left div:nth-child(1) {
         width: 30%;
         height: 100%;
         background: #1b2a47;
      }

      &-left div:nth-child(2) {
         position: absolute;
         top: 0;
         right: 0;
         width: 70%;
         height: 30%;
         background: #fff;
         box-shadow: 0 0 1px #888;
      }
   }

   .theme-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
   }
}

</style>
=======
    </div>
</template>
>>>>>>> 703cb404e78bd3651b29bf4099e9d244b52dcd33
