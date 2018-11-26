var _activity = new Vue({
	el: '#activity',
	data: {
		activitvityIndex:1,
		tagIndex: 1,
		statusIndex:1,
		activityTag:  0,
		btnText: '马上报名',
		addressIndex: 'all',
		hasProvice: false,
		hasCity: false
	},
	methods: {
		changeActivity(val) {
			this.activitvityIndex = val
		},
		changeTag(val) {
			this.tagIndex = val
		},
		changeStatus(val) {
			this.statusIndex = val
		},
		changeActivityTag(val,status) {
			this.activityTag = val;
			if(status) {
				this.btnText = '精彩回顾'
			} else {
				this.btnText = '马上报名'
			}
		},
		changeAddress(val) {
			this.addressIndex = val;

			if(val == 'provice') {
				this.hasProvice = true
				this.hasCity = false
			}

			if(val == 'city') {
				this.hasCity = true
				this.hasProvice = false
			}
		}
	},
	filters: {

	},
	mounted: function () {

	}
})
