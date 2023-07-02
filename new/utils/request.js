const $request = (url, data, method = 'POST', headers = "application/json;") => {
		return new Promise((resolve, reject) => {
			// if (_sign) {
				uni.request({
					// url: "http://192.168.2.136:8093/api/xcx" + url,
					url: "https://xcx.wujingchuanmei.com/api/xcx" + url,
					// url: "http://47.106.137.96:8093/api/xcx" + url,
					// url:"http://47.106.137.96:8093/api/xcx" + url,
					method: method,
					data: data,
					header: {
						'Content-Type': headers,
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success(res) {
						resolve(res)
					},
					fail(error) {
						reject(error);
					},
					complete() {
					}
				})
		})
}
//get请求
const $get = (url, data) => {
	return $request(url, data, 'GET')
}
export const get = (url, data) => {
	return $request(url, data,  'GET')
}
//post请求
const $post = (url, data) => {
	return $request(url, data, 'POST')
}
export const post = (url, data) => {
	return $request(url, data, 'POST')
}
//给uniapp原生的requset赋值
//记得要在mian.js中引用
uni.$request = $request
uni.$get = $get
uni.$post = $post