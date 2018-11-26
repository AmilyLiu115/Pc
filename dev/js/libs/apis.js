Vue.prototype.$axios = axios; // 将 axios 注册到vue上

let apis = {
	getUser:'/apis/front/userMessage/getUser.do',
	updateUser:'/apis/front/userMessage/updateUser.do',
	getSignList:'/apis/front/applicant/list.do',
	saveSignInfo:'/apis/front/applicant/save.do',
	delSignInfo:'/apis/front/applicant/delete.do',
	setDefaultSign:'/apis/front/applicant/default.do',
	getMyActivity:'/apis/front/myActivity/getMyActivity.do',
	getActivityDetail:'/apis/front/myActivity/getActivityDetail.do'


}


// 封装的ajax请求
let postXhr = function (opt) {
	// opts = {
	// 	self: ''   this指向
	// 	url: '',    请求地址
	// 	data: {},	请求参数
	// 	callBack: ()=> {
	//				请求回调函数
	// 	}
	 // }


	// opts.self.$axios({
	// 	url: opts.url,
	// 	method: 'post',
	// 	data: opts.data||null,
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	},
	// 	complete: function (res) {
	// 		if (res.body.code == 200) {
	// 			// 请求成功  执行回调函数并处理数据
	// 			opts.callback && opts.callback(res.body.data)
	// 		}

	// 		if (res.body.code == 400) {
	// 			// 执行失败，msg 为失败原因
	// 			opts.self.$message(res.body.msg);
	// 		}

	// 	}
	// })

	opt.self.$axios({
		url: opt.url,
		method: 'post',
		data: opt.data||null,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	   }).then((res) => {
			if (res.data.code == 200) {
			// 请求成功  执行回调函数并处理数据
				opt.callback && opt.callback(res.data.data,res.data)
			
			}
			if (res.data.code == 400) {
			// 执行失败，msg 为失败原因
				opt.self.$message(res.data.msg);
			}
	
	   }).catch(res => {
		console.error(res)
	   })
}



