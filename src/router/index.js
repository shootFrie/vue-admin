import {
	// 创建路由
	createRouter, 
	// 创建路由的历史模式
	createWebHashHistory,
} from 'vue-router'

// 创建路由
const routes = [{
	
}]

// 创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// 默认暴露
export default router