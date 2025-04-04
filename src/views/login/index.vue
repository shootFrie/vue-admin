<template>
  <div class="common-layout">
	<el-container>
	  <el-header class="header-wrapper">
		  <div class="header-content">
			  <h3>通用后台管理系统</h3>
			  <span>欢迎您的登录</span>
		  </div>
	  </el-header>
	  <el-main>
		  <div class="login-wrapper">
			  <el-card class="box-card">
				<el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
			       <el-tab-pane label="登录" name="login">
					  <el-form class="login-form">
						 <el-form-item label="账号">
							<el-input v-model="loginData.account" placeholder="请输入账号"/>
						 </el-form-item>
						 <el-form-item label="密码">
							<el-input v-model="loginData.password" type="password" placeholder="请输入密码"/>
						 </el-form-item>
						 <!-- 底部外壳 -->
						 <div class="footer-wrapper">
							 <div class="forget-password">
								<span class="forget-pwd-btn" @click="openForget">忘记密码</span>
							 </div>
							 <div class="footer-button">
							 	<el-button type="primary" @click="loginClick">登录</el-button>
							 </div>
							 <div class="footer-go-register">
							 	还没有账号？<span class="go-register">马上注册</span>
							 </div>
						 </div>
					  </el-form>
				   </el-tab-pane>
			       <el-tab-pane label="注册" name="register">
					   <el-form class="login-form">
						   <el-form-item label="账号">
						   		<el-input v-model="registerData.account" placeholder="账号长度6-12位"/>
						   </el-form-item>
						   <el-form-item label="密码">
						   		<el-input v-model="registerData.password" type="password" placeholder="密码需长度6-12位含字母数字"/>
						   </el-form-item>
						   <el-form-item label="确认密码">
						   		<el-input v-model="registerData.rePassword" type="password" placeholder="请再次输入密码"/>
						   </el-form-item>
						   <div class="footer-button">
						   	<el-button type="primary" @click="RegisterClick">注册</el-button>
						   </div>
					   </el-form>
				   </el-tab-pane> 
			     </el-tabs>
				  
			</el-card>
		  </div>
	  </el-main>
	  <el-footer class="footer-wrpper">
		  <div class="footer-content">
			  <div class="title">
				  <span>测试测</span> | 
				  <span>测试测试测试</span> | 
				  <span>测试</span>
			  </div>
			  <div class="title">
				<span>Copyright @ 版权所有</span>
			  </div>
		  </div>
	  </el-footer>
	</el-container>
  </div>
  
  <Forget ref="forgetPlat"></Forget>
</template>

<script lang='ts' setup>
	import { ref, reactive } from 'vue'
	import {register, login} from '@/api/login.js'
	import { ElMessage } from 'element-plus'
	import {useRouter} from 'vue-router'
	import Forget from './components/forget_pwd.vue'
	const activeName = ref('login')
	
	// 路由实例
	const router = useRouter()
	
	interface formData {
		account: number;
		password: string;
		rePassword ?: string;
	}
	// 登录表单数据
	const loginData:formData = reactive({
		account: null,
		password: '',
	})
	// 注册表单数据
	const registerData:formData = reactive({
		account: null,
		password: '',
		rePassword: ''
	})
	
	// 登录
	const loginClick = async () => {
		const res = await login(loginData);
		console.log(res)
		const {status, message, token} = res.data
		if(status == 0 && message == "登录成功") {
			ElMessage({
				message: '登录成功',
				type: 'success'
			})
			localStorage.setItem('token', token)
			// 跳转首页
			router.push('/home')
		} else {
			ElMessage.error('登录失败')
		}
	}
	// 注册点击
	const RegisterClick = async () => {
		if(register.password === registerData.rePassword) {
			const res = await register(registerData)
			console.log(res)
			if(res.data.status == 1 && res.data.message === '注册账号成功') {
				ElMessage({
					message: '注册账号成功',
					type: 'success',
				})
				// 跳转到登录
				activeName.value = "login"
			} else {
				ElMessage.error("注册失败，"+ res.data.message)
			}
		} else {
			ElMessage.error("两次密码不一致")
		}
		
	}
	// 忘记密码弹窗
	const forgetPlat = ref()
	// 打开忘记密码弹窗
	const openForget = () => {
		forgetPlat.value.open()
	}
</script>

<style lang="scss" scoped>
	.header-wrapper {
		// 头部内容
		.header-content {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			span {
				font-size: 13px;
			}
		}
	}
	// 主体部分
	.el-main{
		background-image: url('@/assets/pexels-eberhard-grossgasteiger-640947.jpg');
		background-size: 100% 150%;
		-moz-background-size: 100% 150%;
		background-repeat: no-repeat;
		height: 600px;
		overflow: hidden;
		--el-main-padding: 0;
		// 登录外壳
		.login-wrapper {
			width: 1200px;
			height: 600px;
			margin: 0 auto;
			// 卡片
			.box-card{
				width: 350px;
				height: 375px;
				float: right;
				position: relative;
				top: 14%;
				// 登录底部外壳
				.footer-wrapper{
					display: flex;
					flex-direction: column;
					
					.forget-password {
						display: flex;
						justify-content: flex-end;
						margin: 10px 0;
						
					}
						
					.footer-go-register{
						font-size: 12px;
						margin: 12px 0;
						display: flex;
						justify-content: center;
						
						.go-register{
							font-size: 12px;
							color: #409eff;
							cursor: pointer;
						}
					}
					
				}
				
				// 登录按钮
				.forget-pwd-btn{
					font-size: 12px;
					color: #409eff;
					// 鼠标移入效果
					cursor: pointer;
				}
			}
		}
	}
	// 底部
	.footer-wrpper{
		margin-top: 10px;
		// 底部主体部分
		.footer-content {
			width: 1200px;
			margin: 0 auto;
			// 底部介绍单行
			.title {				
				display: flex;
				justify-content: center;
				align-items: center;
				color: #666;
			}
			span{
				color: #666;
				font-size: 12px;
				padding: 0 10px 0 10px;
			}
		}
	}
	// 表单边距
	.el-form{
		margin-top: 30px;
	}
	// 样式穿透
	// 卡片内tab导航字体颜色
	:deep(.el-tabs__item){
		color: #333;
		font-size: 18px;
	}
	// 输入框高度
	:deep(.el-input__inner) {
		height: 40px;
	}
	// 输入框标签高度
	:deep(.el-form-item__label) {
		height: 40px;
		line-height: 40px;
	}
	// 登录按钮
	:deep(.el-button) {
		width: 300px;
		height: 45px;
		font-size: 16px;
	}
</style>