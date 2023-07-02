function login(appId) {
		wx.showLoading({
			title: '登录中',
		});
		return new Promise((resolve, reject) => {
			wx.login({
				success: function(res) {
					if (res.code) {
						uni.request({
							// url: "http://192.168.2.136:8093/api/xcx/login",
							url: 'https://xcx.wujingchuanmei.com/api/xcx/login',
							method: 'post',
							data: {
								code: res.code,
								appId: appId,
							},
							success: res => {
								wx.hideLoading();
								const data = res.data;
								//本地存储token
								uni.setStorageSync('articalToken', data.token);
								resolve('success');
							},
						});
					}
				},
			});
		});
	}
export default login;