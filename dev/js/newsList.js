var newsList = new Vue({
	el: '#newsList',
	data: {
		detailText: '7月16日，市北高新云立方--上海-亚马逊AWS联合创新中心（以下简称“SHA-JIC”）自落成后迎来了第一场招募活动。各级领导、嘉宾、合作伙伴以及有志创业小伙伴们云集，整个招募会可谓是高朋满座，干货累累。'
	},
	methods: {},
	filters: {
		formatText(val) {
			let _length = val.length;

			if(_length >74) {
				val = val.substring(0,74) + '...'
			};

			return val
		}
	},
	mounted: function () {

	}
});