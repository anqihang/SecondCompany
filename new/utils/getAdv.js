//获取广告id
export const f_getAdv = function(o) {
		Adv(o).then(res => {
			let type = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'config_adv') {
					type = element.advertTypeId;
					adv.value.status = element.status;
					adv.value.every = element.acticleCnt;
					adv.value.type = element.advertTypeId;
				}
			});
			res.advertTypes.forEach(element => {
				if (type == element.type) {
					adv.value.advId = element.content.trim();
				}
				//插屏广告
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum - 0;
				}
			});
			if (advC.value.status) {
				//todo
				// createAdv1();
			}
		});
	}