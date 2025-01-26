	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import shiwuleixing from '@/views/shiwuleixing/list'
	import renlingjilu from '@/views/renlingjilu/list'
	import xuesheng from '@/views/xuesheng/list'
	import zixishileixing from '@/views/zixishileixing/list'
	import zixishixinxi from '@/views/zixishixinxi/list'
	import zixishixuexi from '@/views/zixishixuexi/list'
	import zixishiyuyue from '@/views/zixishiyuyue/list'
	import storeup from '@/views/storeup/list'
	import shiwuzhaoling from '@/views/shiwuzhaoling/list'
	import ziliaoleixing from '@/views/ziliaoleixing/list'
	import guanlizhe from '@/views/guanlizhe/list'
	import config from '@/views/config/list'
	import ziliaogongxiang from '@/views/ziliaogongxiang/list'
	import yijianfankui from '@/views/yijianfankui/list'
	import discussshiwuzhaoling from '@/views/discussshiwuzhaoling/list'
	import guanlizheCenter from '@/views/guanlizhe/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/guanlizheCenter',
			name: '管理者个人中心',
			component: guanlizheCenter
		}
		,{
			path: '/news',
			name: '公告信息',
			component: news
		}
		,{
			path: '/shiwuleixing',
			name: '失物类型',
			component: shiwuleixing
		}
		,{
			path: '/renlingjilu',
			name: '认领记录',
			component: renlingjilu
		}
		,{
			path: '/xuesheng',
			name: '学生',
			component: xuesheng
		}
		,{
			path: '/zixishileixing',
			name: '自习室类型',
			component: zixishileixing
		}
		,{
			path: '/zixishixinxi',
			name: '自习室信息',
			component: zixishixinxi
		}
		,{
			path: '/zixishixuexi',
			name: '自习室学习',
			component: zixishixuexi
		}
		,{
			path: '/zixishiyuyue',
			name: '自习室预约',
			component: zixishiyuyue
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/shiwuzhaoling',
			name: '失物招领',
			component: shiwuzhaoling
		}
		,{
			path: '/ziliaoleixing',
			name: '资料类型',
			component: ziliaoleixing
		}
		,{
			path: '/guanlizhe',
			name: '管理者',
			component: guanlizhe
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		,{
			path: '/ziliaogongxiang',
			name: '资料共享',
			component: ziliaogongxiang
		}
		,{
			path: '/yijianfankui',
			name: '意见反馈',
			component: yijianfankui
		}
		,{
			path: '/discussshiwuzhaoling',
			name: '失物招领评论',
			component: discussshiwuzhaoling
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
