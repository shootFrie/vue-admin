import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
// 引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局配置国际化
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'

// createApp(App).mount('#app')
// 创建实例
const app = createApp(App)
// 注册所有图标
for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus, {
	locale: zhCn
})
// 挂载router，挂载element-plus
app.use(router).mount('#app')
