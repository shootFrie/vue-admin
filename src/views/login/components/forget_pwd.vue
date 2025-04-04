<template>
	<!-- 忘记密码 -->
	<el-dialog v-model="state.forgetPwdDialog" title="忘记密码" width="400px">
		<el-form class="login-form" :label-position="labelPosition" :rules="rules">
			<el-form-item label="输入您的注册账号" prop="account">
				<el-input v-model="forgetData.account" placeholder="输入您的注册账号"/>
			</el-form-item>
			<el-form-item label="输入您的个人邮箱" prop="email">
				<el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
			</el-form-item> 
		</el-form>
		<!-- 底部外壳 -->
		 <template #footer>
		  <span class="dialog-footer">
			<el-button @click="state.forgetPwdDialog = false">取消</el-button>
			<el-button type="primary" @click="openChangePwd">
			  下一步
			</el-button>
		  </span>
		</template>
	</el-dialog>
	
	<!-- 修改密码 -->
	<el-dialog v-model="state.changePwdDialog" title="修改密码" width="400px">
		<el-form class="login-form" :label-position="labelPosition" :rules="rules">
			<el-form-item label="输入您的新密码" prop="password">
				<el-input v-model="forgetData.password" placeholder="输入您的新密码"/>
			</el-form-item>
			<el-form-item label="再次确认您的密码" prop="rePwd">
				<el-input v-model="forgetData.rePwd" placeholder="再次确认您的密码" />
			</el-form-item> 
		</el-form>
		<!-- 底部外壳 -->
		 <template #footer>
		  <span class="dialog-footer">
			<el-button @click="state.changePwdDialog = false">取消</el-button>
			<el-button type="primary" @click="confirmChangePwd">确定</el-button>
		  </span>
		</template>
	</el-dialog>
</template>

<script lang='ts' setup>
	import { ref,reactive } from 'vue'
	const labelPosition = ref('top')
	// 表单对象接口
	interface forgetData {
		account: null;
		email: string;
		password: string;
		rePwd: string;
	}
	// 表单对象
	const forgetData:forgetData = reactive({
		account:null,
		email:'',
		password:'',
		rePwd:'',
	})
	
	const state = reactive({
		forgetPwdDialog: false,
		changePwdDialog: false, 
	})
	
	// 表单规则
	const rules = reactive({
		account:[
			{required: true, validator:"", message: "请输入您注册的账号", trigger: 'blur'},
		],
		email:[
			{required: true, validator:"", message: "请输入您注册的邮箱",  trigger: 'blur'},
		],
		password: [
			{require: true, message: "请输入您想修改的密码", trigger: 'blur'}
		],
		rePwd: [
			{required: true, message:"请再次确认您想修改的新密码", trigger: 'blur'}
		]
	})
	
	// 打开修改密码的弹窗
	const openChangePwd = () => {
		state.forgetPwdDialog = false;
		state.changePwdDialog = true;
	}
	
	// 打开弹窗
	const open = () => {
		state.forgetPwdDialog = true
	}
	// 
	const confirmChangePwd = () => {
		
	}
	defineExpose({
		open
	})
</script>

<style lang='scss' scoped>
</style>