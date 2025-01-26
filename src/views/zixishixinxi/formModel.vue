<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="50%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="自习室名称" prop="zixishimingcheng">
							<el-input class="list_inp" v-model="form.zixishimingcheng" placeholder="自习室名称"
								 type="text" 								:readonly="!isAdd||disabledForm.zixishimingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="自习室位置" prop="zixishiweizhi">
							<el-input class="list_inp" v-model="form.zixishiweizhi" placeholder="自习室位置"
								 type="text" 								:readonly="!isAdd||disabledForm.zixishiweizhi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="图片" prop="tupian">
							<uploads
								:disabled="!isAdd||disabledForm.tupian?true:false"
								action="file/upload" 
								tip="请上传图片" 
								:limit="3" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.tupian?form.tupian:''" 
								@change="tupianUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="开放时间" prop="kaifangshijian">
							<el-input class="list_inp" v-model="form.kaifangshijian" placeholder="开放时间"
								 type="text" 								:readonly="!isAdd||disabledForm.kaifangshijian?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="座位号" prop="zuoweihao">
							<el-input class="list_inp" v-model="form.zuoweihao" placeholder="座位号"
								 type="text" 								:readonly="!isAdd||disabledForm.zuoweihao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="管理者账号" prop="guanlizhezhanghao">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.guanlizhezhanghao?true:false"
								v-model="form.guanlizhezhanghao" 
								placeholder="请选择管理者账号"
								@change="guanlizhezhanghaoChange">
								<el-option v-for="(item,index) in guanlizhezhanghaoLists" :label="item" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="容纳人数" prop="rongnarenshu">
							<el-input class="list_inp" v-model.number="form.rongnarenshu" placeholder="容纳人数"
								 type="text" 								:readonly="!isAdd||disabledForm.rongnarenshu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="已约人数" prop="yiyuerenshu">
							<el-input class="list_inp" v-model.number="form.yiyuerenshu" placeholder="已约人数"
								 type="text" 								:readonly="!isAdd||disabledForm.yiyuerenshu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="占座率" prop="zhanzuolv">
							<el-input class="list_inp" v-model="zhanzuolv" :readonly="true" placeholder="占座率" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="自习室类型" prop="zixishileixing">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.zixishileixing?true:false"
								v-model="form.zixishileixing" 
								placeholder="请选择自习室类型"
								>
								<el-option v-for="(item,index) in zixishileixingLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="状态" prop="zhuangtai">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.zhuangtai?true:false"
								v-model="form.zhuangtai" 
								placeholder="请选择状态"
								>
								<el-option v-for="(item,index) in zhuangtaiLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="设备施设" prop="shebeishishe">
							<el-input v-model="form.shebeishishe" placeholder="设备施设" type="textarea"
							:readonly="!isAdd||disabledForm.shebeishishe?true:false"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="详情" prop="xiangqing">
							<editor :value="form.xiangqing" placeholder="请输入详情" :readonly="!isAdd||disabledForm.xiangqing?true:false"
								class="list_editor" @change="(e)=>editorChange(e,'xiangqing')"></editor>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'zixishixinxi'
	const formName = '自习室信息'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		zixishimingcheng : false,
		zixishiweizhi : false,
		tupian : false,
		kaifangshijian : false,
		zuoweihao : false,
		guanlizhezhanghao : false,
		rongnarenshu : false,
		yiyuerenshu : false,
		zhanzuolv : false,
		zixishileixing : false,
		shebeishishe : false,
		xiangqing : false,
		zhuangtai : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		zixishimingcheng: [
		],
		zixishiweizhi: [
		],
		tupian: [
		],
		kaifangshijian: [
		],
		zuoweihao: [
		],
		guanlizhezhanghao: [
		],
		rongnarenshu: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		yiyuerenshu: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		zhanzuolv: [
			{ validator: validateNumber, trigger: 'blur' },
		],
		zixishileixing: [
		],
		shebeishishe: [
		],
		xiangqing: [
		],
		zhuangtai: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//图片上传回调
	const tupianUploadSuccess=(e)=>{
		form.value.tupian = e
	}
	//管理者账号列表
	const guanlizhezhanghaoLists = ref([])
	//自习室类型列表
	const zixishileixingLists = ref([])
	//状态列表
	const zhuangtaiLists = ref([])
	const zhanzuolv =computed(()=>{
		let c = form.value
		let a = c.yiyuerenshu/c.rongnarenshu
		form.value.zhanzuolv = a?a.toFixed(2) : 0
		return a?a.toFixed(2) : 0
	})
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			zixishimingcheng: '',
			zixishiweizhi: '',
			tupian: '',
			kaifangshijian: '',
			zuoweihao: '',
			guanlizhezhanghao: '',
			rongnarenshu: '',
			yiyuerenshu: '',
			zhanzuolv: '',
			zixishileixing: '',
			shebeishishe: '',
			xiangqing: '',
			zhuangtai: '未预约',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.xiangqing = res.data.data.xiangqing?(res.data.data.xiangqing.replace(reg,'../../../cl4875579/file')):'';
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='zixishimingcheng'){
					form.value.zixishimingcheng = row[x];
					disabledForm.value.zixishimingcheng = true;
					continue;
				}
				if(x=='zixishiweizhi'){
					form.value.zixishiweizhi = row[x];
					disabledForm.value.zixishiweizhi = true;
					continue;
				}
				if(x=='tupian'){
					form.value.tupian = row[x];
					disabledForm.value.tupian = true;
					continue;
				}
				if(x=='kaifangshijian'){
					form.value.kaifangshijian = row[x];
					disabledForm.value.kaifangshijian = true;
					continue;
				}
				if(x=='zuoweihao'){
					form.value.zuoweihao = row[x];
					disabledForm.value.zuoweihao = true;
					continue;
				}
				if(x=='guanlizhezhanghao'){
					form.value.guanlizhezhanghao = row[x];
					disabledForm.value.guanlizhezhanghao = true;
					continue;
				}
				if(x=='rongnarenshu'){
					form.value.rongnarenshu = row[x];
					disabledForm.value.rongnarenshu = true;
					continue;
				}
				if(x=='yiyuerenshu'){
					form.value.yiyuerenshu = row[x];
					disabledForm.value.yiyuerenshu = true;
					continue;
				}
				if(x=='zhanzuolv'){
					form.value.zhanzuolv = row[x];
					disabledForm.value.zhanzuolv = true;
					continue;
				}
				if(x=='zixishileixing'){
					form.value.zixishileixing = row[x];
					disabledForm.value.zixishileixing = true;
					continue;
				}
				if(x=='shebeishishe'){
					form.value.shebeishishe = row[x];
					disabledForm.value.shebeishishe = true;
					continue;
				}
				if(x=='xiangqing'){
					form.value.xiangqing = row[x];
					disabledForm.value.xiangqing = true;
					continue;
				}
				if(x=='zhuangtai'){
					form.value.zhuangtai = row[x];
					disabledForm.value.zhuangtai = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.zhuangtai='未预约'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
		})
		context?.$http({
			url: `option/guanlizhe/guanlizhezhanghao`,
			method: 'get'
		}).then(res=>{
			guanlizhezhanghaoLists.value = res.data.data
		})
		context?.$http({
			url: `option/zixishileixing/zixishileixing`,
			method: 'get'
		}).then(res=>{
			zixishileixingLists.value = res.data.data
		})
		zhuangtaiLists.value = "已预约,未预约".split(',')
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	const guanlizhezhanghaoChange=()=>{
		context?.$http({
			url: `follow/guanlizhe/guanlizhezhanghao?columnValue=` + form.value.guanlizhezhanghao,
			method: 'get'
		}).then(res=>{
		})
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		if(form.value.tupian!=null) {
			form.value.tupian = form.value.tupian.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border: 0px solid #ddd;
		border-radius: 4px;
		padding: 30px;
		margin: 0;
		background: #fff;
		// form item
		:deep(.el-form-item) {
			margin: 0 150px 20px 0;
			background: none;
			display: flex;
			//label
			.el-form-item__label {
			 background: none;
			 font-weight: 500;
			 display: block;
			 width: 150px;
			 min-width: 150px;
			 text-align: right;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 1px solid #eee;
					border-radius: 0px;
					padding: 0 10px;
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 350px;
					height: 36px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
				// 下拉框
				.list_sel {
					border: 1px solid #eee;
					border-radius: 0px;
					padding: 0 10px;
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 350px;
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
							.el-input__wrapper{
								border: none;
								box-shadow: none;
								background: none;
								border-radius: 0;
								height: 100%;
								padding: 0;
							}
							.is-focus {
								box-shadow: none !important;
							}
						}
					}
				}
				// 富文本
				.list_editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					margin: 0;
					width: auto;
					min-height: 320px;
					border-color: #eee;
					border-width: 1px;
					border-style: solid;
					min-width: 100%;
					height: auto;
				}
				// 长文本
				.el-textarea__inner {
					border: 1px solid #eee;
					border-radius: 0;
					padding: 12px;
					color: #333;
					width: auto;
					font-size: 14px;
					min-height: 120px;
					min-width: 50%;
				}
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
						margin: 7px 0 0;
						color: #999;
						display: flex;
						font-size: 14px;
						justify-content: flex-start;
						align-items: center;
					}
					//外部盒子
					.el-upload--picture-card {
						border: 1px solid #eee;
						cursor: pointer;
						background-color: #fff;
						border-radius: 0px;
						width: 120px;
						line-height: 70px;
						text-align: center;
						height: 60px;
						//图标
						.el-icon{
							color: #ff9900;
							font-size: 32px;
						}
					}
					.el-upload-list__item {
						border: 1px solid #eee;
						cursor: pointer;
						background-color: #fff;
						border-radius: 0px;
						width: 120px;
						line-height: 70px;
						text-align: center;
						height: 60px;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 0px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #990033;
			background: #ff990030;
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_cancel:hover {
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 0px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #fff;
			background: #ff9900;
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_confirm:hover {
		}
	}
</style>