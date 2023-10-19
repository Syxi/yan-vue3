import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/router/routeGuard'
import { setupStore } from '@/store'
import { setupDirective } from '@/directive'




// 本地SVG图标
import "virtual:svg-icons-register"
import 'uno.css'
import '@/styles/index.scss'

const app = createApp(App);

// 全局注册 自定义指令(directive)
setupDirective(app);

// 全局注册 状态管理(store)
setupStore(app);

app.use(router).mount('#app')