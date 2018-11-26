let memberCenter = new Vue({
	el: '#memberCenter',
	data() {
        return {
			// 加载层
			showLoading:true,
			// 分页器显示和隐藏
			showPager:true,
			// 主页及个人中心
            index:'1',
			userData:{
				peopleId:'',
				puNickname:'',
				puRealname:'',
				peoplePhone:'',
				peopleMail:''
			},
			indicator:'',
			showSaveBtn:true,
			// 我的活动
			noSign:false,
			activityList:[],
			activeName: '4',
			currentPageNo:'1',
			totalPageCount:'',
			showOrderDetail:false,
			orderDialogObj:{
				orderNo:'',
				orderStatus:'',
				signInfoList:[],
				remark:''
			},
			// 报名信息维护
			addSignInfo:false,
			signInfoList:'',
			editSignObj:{
				name:'',
				mobile:'',
				companyName:'',
				position:'',
				mail:''
			},
			reg5:'',
			reg6:''
        }
	},
	computed: {
		
	},
	watch:{
		'editSignObj.mobile'(newValue) {
			　　　　this.checkPhoneFn(newValue);
			　　},
		'editSignObj.mail'(newValue) {
					this.checkMailFn(newValue);
			　　}
	},
	methods: {
		// 主页
        changeTab (key, keyPath) {
			this.index = key;
			this.swithAxiosFn(key);
		
		},
		swithAxiosFn (key) {
			// debugger;
			if (key == '1') {
				// 个人中心页面 请求user接口
				this.$axios({
					url: apis.getUser,
					method: 'post',
					headers: {
					 'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res)=>{
					if(res.data.code == 403) {
						// 让其先登录
						this.$message('您还未登录，请先登录');
					} else if (res.data.code == 200){
						// 请求成功  打开代码
						// this.userData = res.body.data;
						this.userData = {
							"peopleId": 2,
							"puNickname": "唐老鸭",
							"puRealname": "唐劳亚",
							"peoplePhone": "123456789",
							"peopleMail": "123@qq.com"
						}
						this.showSaveBtn = true;
					} else {
						// 请求失败
						this.$message(res.data.msg);
					}
				}).catch((res)=>{
					this.$message(res);
				})
			
			
			} else if (key == 2) {
				// 我的活动请求活动列表接口

				// 页宽 一页显示多少条  pageSize  总页数  pageCount 
				
				var	_data1 = Qs.stringify({
					pageNo:1,
					pageSize:3
				});
				postXhr({
					self:this,
					url:apis.getMyActivity,
					data:_data1,
					callback:(data)=>{
						// debugger;
						if (!data||data.entityList == null ||!data.entityList.length) {
							this.noSign = true;
						} else {
							var	_data2 = Qs.stringify({
								pageNo:1,
								pageSize:3,
								orderStatus:this.activeName
							});
							postXhr({
								self:this,
								url:apis.getMyActivity,
								data:_data2,
								callback:(data)=>{
									// debugger;
									if (!data||data.entityList == null ||!data.entityList.length) {
										// this.noSign = true;
										this.showPager = false;
										this.activityList = [];
									} else {
										this.showPager = true;
										this.activityList = data.entityList;
										this.currentPageNo = data.pageNo;
										this.totalPageCount = data.pageCount;
									}
								}
							})
						}
					}
				})
			
			
			
				
			} else {
				// 报名信息维护请求报名人信息接口
				postXhr({
					self:this,
					url:apis.getSignList,
					callback:(data)=>{
						this.signInfoList = data;
					}
				})
		
			}
		},
		timestampToTime(timestamp) {
			var date = new Date(timestamp);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y+M+D+h+m+s;
		},
		activityStatusToText (item) {
			let text ='';
			switch (item.toString()) {
				case '0':
				text = '待审核';
				break;
				case '1':
				text = '报名中';
				break;
				case '2':
				text = '已驳回';
				break;
				case '3':
				text = '报名已截止';
				break;
				case '4':
				text = '已结束';
				break;
				case '5':
				text = '待提交';
				break;
			}
			return text;
		},
		statusToText (item) {
			let text ='';
			switch (item.toString()) {
				case '0':
				text = '待审核';
				break;
				case '1':
				text = '待支付';
				break;
				case '2':
				text = '已取消';
				break;
				case '3':
				text = '已驳回';
				break;
				case '4':
				text = '已完成';
				break;
			}
			return text;
		},
		// 个人中心
		saveUserData () {
			if (!this.userData.puNickname) {
				this.$message('您的昵称不能为空')
				return false
			}
			if (!this.userData.puRealname) {
				this.$message('您的姓名不能为空')
				return false
			}
			postXhr({
				self:this,
				url:apis.updateUser,
				data:{
					puNickname:this.userData.puNickname,
					puRealname:this.userData.puRealname
				},
				callback:()=>{
					this.showSaveBtn = false;
				}
			})
		},

		// 我的活动
		changeStatus () {
				var	_data = Qs.stringify({
					pageNo:1,
					pageSize:3,
					orderStatus:this.activeName
				});
				postXhr({
					self:this,
					url:apis.getMyActivity,
					data:_data,
					callback:(data)=>{
						if (!data || data.entityList == null ||!data.entityList.length) {
							// this.noSign = true;
							this.showPager = false;
							this.activityList = [];
						} else {
							this.showPager = true;
							this.activityList = data.entityList;
							this.currentPageNo = data.pageNo;
							this.totalPageCount = data.pageCount;
						}
					}
				})

	
			
		},
		closeOrderDetailFn () {
			this.showOrderDetail = false;
		},
		showOrderDetailFn (obj) {
			this.orderDialogObj.orderNo = obj.orderNo
			this.orderDialogObj.orderStatus = obj.status;
			this.orderDialogObj.ticketName = obj.ticketName;
			this.orderDialogObj.remark = obj.auditOpinion;
			// 请求订单详情接口
			postXhr({
					self:this,
					url:apis.getActivityDetail,
					data:Qs.stringify({orderId:obj.id}),
					callback:(data)=>{
						this.orderDialogObj.signInfoList = data;
						this.showOrderDetail = true;
					}
				})

			
		},
		statusToClass (item) {
			let className ='';
			switch (item.toString()) {
				case '0':
				case '1':
				case '3':
				className = 'warn';
				break;
				case '2':
				className = 'default';
				break;
				case '4':
				className = 'finished';
				break;
			}
			return className;
		},
		handleCurrentChange (val) {
			this.currentPageNo = val;
			var	_data = Qs.stringify({
				pageNo:val,
				pageSize:3,
				orderStatus:this.activeName
			});
			postXhr({
				self:this,
				url:apis.getMyActivity,
				data:_data,
				callback:(data)=>{
					if (data.entityList == null ||!data.entityList.length) {
						// this.noSign = true;
					} else {
						this.activityList = data.entityList;
						this.currentPageNo = data.pageNo;
						this.totalPageCount = data.pageCount;
					}
				}
			})

		},
		toPayPage (activityId,orderNo) {
			// 去支付页面
			// location.href = "/html/1/163/171/175/index.html?id="+activityId+'&orderNo='+orderNo;

		},
		// 报名信息维护
		closeSignPopFn () {
			this.addSignInfo = false;
		},
		openSignPopFn () {
			this.editSignObj ={
				name:'',
				mobile:'',
				companyName:'',
				position:'',
				mail:''
			}
			this.addSignInfo = true;
		},
		saveSignObjFn () {
			if (!this.editSignObj['name']||!this.editSignObj['mobile']||!this.editSignObj['companyName']||!this.editSignObj['position']||!this.editSignObj['mail']) {
				this.$message('您有必填项,请填写完整')
				return false;
			}
			if (!this.reg5||!this.reg6) {
				this.$message('信息填写有误！')
				return false
			}
			// 请求保存报名人信息的接口
			var _data = Qs.stringify(this.editSignObj)
			postXhr({
				self:this,
				url:apis.saveSignInfo,
				data:_data,
				callback:(data)=>{
					// 操作成功的再次请求报名人列表
					postXhr({
						self:this,
						url:apis.getSignList,
						callback:(data)=>{
							this.signInfoList = data;
							this.addSignInfo = false;
						}
					})
				}
			})

		},
		checkNullFn(val) {
			if(val=='') {
				this.$message('该字段不能为空')
			}
		},
		checkPhoneFn () {
            let reg =/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(this.editSignObj.mobile)) {
                this.indicator = 'phone';
                this.$message('您的手机号不符合格式，请重新输入')
                this.reg5 = false;
            } else {
                this.reg5 = true;
                this.indicator = '';
            }
        },
        checkMailFn () {
			// /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
            let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (!reg.test(this.editSignObj.mail)) {
				this.indicator = 'mail';
				this.$message('您的邮箱不符合格式，请重新输入')
                this.reg6 = false;
            } else {
                this.reg6 = true;
                this.indicator = '';
            }
        },
		editFn (index) {
			this.editSignObj = this.signInfoList[index];
			this.addSignInfo = true;
		},
		delFn (index) {
			var _data = Qs.stringify({id:this.editSignObj.id})
			postXhr({
				self:this,
				url:apis.delSignInfo,
				data:_data,
				callback:(data)=>{
					this.signInfoList.splice(index,1);
				}
			})
		},
		setDefaultFn (index) {
			var _data = Qs.stringify({id:this.editSignObj.id})
			postXhr({
				self:this,
				url:apis.setDefaultSign,
				data:_data,
				callback:(data)=>{
					// 设置默认值后重新请求列表
					postXhr({
						self:this,
						url:apis.getSignList,
						callback:(data)=>{
							this.signInfoList = data;
							this.addSignInfo = false;
						}
					})
				}
			})
		}
		
 		
	},
	created() {
		this.showOrderDetail = false;
		this.swithAxiosFn(1);
		
	},
	mounted () {
		// loading弹框
		this.showLoading = false;
	}
})