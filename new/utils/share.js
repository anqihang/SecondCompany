export const share = function(info){
		let token = uni.getStorageSync('articalToken');
		// if(!token){
			console.log('share');
			console.log(info);
			
			console.log(info.indexOf("&can"));
		// if(info.indexOf("&can")>=0){
			console.log('share无参');
			uni.redirectTo({
				url:"/pages/index/index?"+info
			})
		// }
}