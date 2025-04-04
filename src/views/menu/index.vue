<template>
	  <div class="common-layout">
	    <el-container>
			<el-aside width="200px" >
			 <div class='title'>通用后台管理系统</div>
			  <el-menu class="el-menu-vertical-demo" router >
				  <template v-for='item in menuList' >
					  <!-- 无子菜单的 -->
					<el-menu-item v-if="!item.children || !item.children.length" :index="item.index">
					  <el-icon><component :is="item.icon"> </component></el-icon>
					  <span>{{item.title}}</span>
					</el-menu-item>
					<!-- 有子菜单的 -->
					<el-sub-menu v-else :index="item.index">
					  <template #title>
						<el-icon><component :is="item.icon"> </component></el-icon>
						<span>{{item.title}}</span>
					  </template>
					  <el-menu-item-group v-for="child in item.children" :title="child.title">
						<el-menu-item v-for='childItem in child.children' :index="childItem.index">{{childItem.title}}</el-menu-item>
					  </el-menu-item-group>
					</el-sub-menu>
				  </template>
				
			  </el-menu> 
			</el-aside>
			
			<!-- 右侧主页面 -->
			<el-container>
				<el-header>
					<span class="header-left-content">尊敬的 xx 欢迎您登录本系统</span>
					
					<div class="header-right-content">
						<el-icon :size="20"><Message /></el-icon>
						<!-- 头像 -->
						 <el-avatar :size="24" :src="circleUrl" /> 
						 <el-dropdown>
							<span class="el-dropdown-link">
							   设置
							</span>
							<template #dropdown>
							   <el-dropdown-menu>
								<el-dropdown-item>设置账号</el-dropdown-item>
								<el-dropdown-item>更改头像</el-dropdown-item>
								<el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
							   </el-dropdown-menu> 
							</template>
						   </el-dropdown>
					</div>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
	    </el-container>
	  </div>
</template>

<script lang="ts" setup>
	import {
	  Document,
	  House,
	  User,
	  TakeawayBox,
	  ChatSquare,
	  Files,
	  DocumentCopy,
	  Setting
	} from '@element-plus/icons-vue'
	import {ref, reactive,toRefs} from 'vue'
	import {useRouter} from 'vue-router'
	// 菜单
	const menuList = [
		{index:'home', title: '首页', icon: House, children:null },
		{index:'home', title: '系统概览', icon: Document, children:null },
		{index:'home', title: '用户管理', icon: User,children:[
			{
				title: '管理员管理',
				children: [
					{index:'3-1', title: '产品管理员' },
					{index:'3-2', title: '用户管理员' },
					{index:'3-3', title: '消息管理员' },
				]
			},
			{
				title: '员工管理',
				children: [
					{index: '4-1', title:'用户列表' }
				]
			}
		]},
		{index:'home', title: '产品管理', icon: TakeawayBox, children:[
			{
				title: '入库管理',
				children: [
					{index: '5-1', title:'产品列表'}
				]
			},
			{
				title: '出库管理',
				children: [
					{index: '5-2', title:'出库列表'}
				]
			}
		] },
		{index:'home', title: '消息管理', icon: ChatSquare,children:[
			{
				title: '消息管理',
				children: [
					{index: '6-1', title: '消息列表'}
				]
			},
			{
				title: '回收站',
				children: [
					{index: '6-2', title: '回收站'}
				]
			}
		]},
		{index:'home', title: '合同管理', icon: Files, children:null },
		{index:'home', title: '操作日志', icon: DocumentCopy,children:null },
		{index:'home', title: '系统设置', icon: Setting,children:null },
	]
	const router = useRouter()
	const state = reactive({
	  circleUrl:
	    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
	  sizeList: ['small', '', 'large'] as const,
	})
	const { circleUrl, } = toRefs(state)
	
	const goLogin = () => {
		router.push('/login')
	}
</script>

<style lang='scss' scoped>
	/* 侧边栏 */
	.el-aside{
		height: 100vh;
		background: #2b303b;
		width: 210px;
		/* 隐藏滚动条 */
		overflow-x: hidden;
		/* 菜单 */
		.el-menu {
			background: #2b303b;
			width: 210px;
			border-right: 0px;
		}
		/* 标题 */
		.title{
			background: #2b303b;
			padding: 20px;
			display: flex;
			justify-content: center;
			color: #fff;
		}
		
		.el-menu-item {
			color: #fff;
		}
		 
	}
	
	.el-header {
		display: flex;
		height: 55px;
		background: #2b303b;
		color: #c1c6c8;
		align-items: center;
		justify-content: space-between;
		
		/* 欢迎语 */
		.header-left-content {
			font-size: 14px;
		}
		
		.header-right-content{
			width:160px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
		}
	}
	/* 无子菜单的 */
	.el-menu-item:hover {
		background: #006eff;
	}
	/* 有子菜单的 */
	:deep(.el-sub-menu__title:hover) {
		background: #006eff;
	}
	:deep(.el-sub-menu__title) {
		color:#fff;
	}
	:deep(.el-menu--inline){
		background: #2b303b;
	}
	.el-dropdown-link:focus-visible {
		outline: none;
	}
</style>