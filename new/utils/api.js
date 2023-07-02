import {
	post,
	get
} from "./request.js";
// 登录
// export const login = (data)=>{
// 	console.log('login',data);
// 	return uni.$post('/xcx/login',data);
// }
//美文
export const homeNewList = (data) => {
	// let = uni.getStorageSync('token');
	let _data = {
		pageNum: data.page,
		appId: data.appId || '',
		cid: data.cid || '',
		title: data.title || '',
		reasonable: false,
		pageSize:data.pageSize || 5,
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		get('/news/index', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//新闻详情
export const newInfo = (data) => {
	let _data = {
		id: data.id,
		appId: data.appId,
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '文章详情数据加载中',
			icon: 'loading',
			mask: true
		});
		get('/news/show', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//首页跳转
export const newInfoHome = (data)=>{
	let _data = {
		id:data.id
	}
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"数据加载中",
			icon:'loading',
			mask:true,
		});
		get("/news/typeShow",_data).then((res)=>{
			resolve(res.data);
			uni.hideLoading();
		})
	})
}
//点赞
export const like = (data) => {
	let _data = {
		id: data.id,
		appId: data.appId,
	};
	return new Promise((resolve, reject) => {
		get('/news/likes', _data).then((res) => {
			resolve(res.data);
		})
	})
}
//取消点赞
export const cancelLike = (data) => {
	let _data = {
		id: data.id,
		appId: data.appId,
	};
	return new Promise((resolve, reject) => {
		get('/news/unlikes', _data).then((res) => {
			resolve(res.data);
		})
	})
}
//城市搜索
export const cityItems = (data) => {
	let _data = {
		appId: data.appId,
		type: data.type
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		post('/news/category', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//分类搜索
export const categoryItems = (data) => {
	let _data = {
		appId: data.appId,
		type: data.type
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		post('/news/category', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//美文搜索项
export const getItems = (data) => {
	// console.log('newInfoGet',data);
	let _data = {
		appId: data.appId,
		// type:data.type
	};
	return new Promise((resolve, reject) => {
		post('/news/category', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//首页广告
export const Adv = (data) => {
	// console.log('newInfoGet',data);
	let _data = {
		appId: data.appId,
		// type:data.type
	};
	return new Promise((resolve, reject) => {
		post('/getAdvConfig', _data).then((res) => {
			resolve(res.data);
		})
	})
}
//视频列表
export const videoList = (data) => {
	let _data = {
		pageNum: data.page,
		// pageSize: 10,
		appid: data.appId || '',
		videoType: data.type || '',
		title:data.title || '',
		reasonable: false,
		pageSize:data.pageSize || 5,
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		get('/video/index', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//首页视频列表
export const videoInfoHome = (data)=>{
	let _data = {
		id:data.id,
		typeId:data.cateId,
	}
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"数据加载中",
			icon:"loading",
			mask:true,
		});
		get("/video/typeShow",_data).then((res)=>{
			resolve(res.data);
			uni.hideLoading();
		})
	})
}
//视频详情
export const videoInfo = (data) => {
	let _data = {
		id: data.id,
		appId: data.appId,
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		get('/video/show', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//视频搜索项
export const getVideoItems = (data) => {
	// console.log('newInfoGet',data);
	let _data = {
		appid: data.appId,
		// type:data.type
	};
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		post('/video/type', _data).then((res) => {
			resolve(res.data);
			uni.hideLoading(); //关闭loading
		})
	})
}
//********************//
//获取tabBar列表
export const getTabBarList = (data) => {
	let _data = {
		appId: data.appId,
	}
	return new Promise((resolve, reject) => {
		get("/xcxPageBottom", _data).then((res) => {
			resolve(res.data);
		})
	})
}
//获取页面配置信息，顶部标题，显示模式
export const getPageConfig = (data) => {
	let _data = {
		appId: data.appId
	}
	return new Promise((resolve, reject) => {
		get("/xcxPage", _data).then((res) => {
			console.log(res, 'pageConfig');
			resolve(res.data);
		})
	})
}
//获取首页列表
export const getHomeList = (data) => {
	uni.showLoading({
		title: "数据加载中",
		icon: "loading",
		mask: true
	})
	get("", _data).then((res) => {
		console.log(res, 'pagesHome');
		resolve(res.data);
		uni.hideLoading();
	})
}
	
