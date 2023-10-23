import { UserConfig, defineConfig, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      // 运行ip访问
      host: "0.0.0.0",
      // 应用端口 (默认：3000)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_TARGT_URL,
          rewrite: (path) =>
            path.replace(
              new RegExp("^" + env.VITE_APP_BASE_API),
              "evn.VITE_APP_TARGT_BASE_API"
            ),
        },
      },
    },

    // 路径别名
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },

    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core"],

        resolvers: [
          // 自动导入 Element Plus相关函数
          ElementPlusResolver(),
          // 自动导入icon图标函数 修改icon组件前缀，不修改默认为i，禁用则为false
          IconsResolver({}),
        ],
        // 是否在vue模板中自动导入
        vueTemplate: true,
        // 生成eslint规则
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        // 指定自动导入函数Ts类型声明文件路径
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动导入 icon 组件
          IconsResolver({
            // 字段collection，即elementplus图标集ep
            enabledCollections: ["ep"],
          }),
        ],
        // 指定自动导入组件ts类型声明文件路径
        dts: path.resolve(pathSrc, "types", "components.d.ts"),
      }),

      Icons({
        autoInstall: true,
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),

      UnoCSS({
        hmrTopLevelAwait: false,
      }),
    ],

    // css预处理器
    css: {
      preprocessorOptions: {
        // define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
    },
  };
});
