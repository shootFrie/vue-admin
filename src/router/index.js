import {
	// 创建路由
	createRouter, 
	// 创建路由的历史模式
	createWebHashHistory,
} from 'vue-router'

// 创建路由
const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		name:'login',
		path:'/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		name:'menu',
		path:'/menu',
		component: () => import('@/views/menu/index.vue'),
		children:[
			{
				name:'home',
				path:'/home',
				component: () => import('@/views/home/index.vue')
			},
		]
	},
]

// 创建路由实例
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// 默认暴露
export default router