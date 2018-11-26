var homePage = new Vue({
	el: '#homePage',
	data: {
		activeTab: 0,
		pointNews: '项专项专项专项专项专项专项专项专项专项专项斗争高新区市场监管局扎实开展扫黑除恶专项斗争专项斗争高新区市场监管局扎实开展扫黑除恶专项斗争专项斗争高新区市场监管局扎实开展扫黑除恶专项斗争'
	},
	methods: {
		changeTab: function (val) {
			this.activeTab = val
		}
	},
	filters: {
		addEllipsis: function (val) {
			let _length = val.length;
			if(_length >73) {
				val = val.substring(0,73) + '...'
			}
			return val
		}
	},
	mounted: function () {
		// banner-swiper
		var swiper = new Swiper('.banner-container', {
			spaceBetween: 30,
			effect: 'fade',
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.banner-swiper-pagination',
				clickable: true,
			},
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// }
		});

	//	news-swiper
		var galleryTop = new Swiper('.gallery-top', {
			spaceBetween: 0,
			loop:true,
			loopedSlides: 5, //looped slides should be the same
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },
		});
		var galleryThumbs = new Swiper('.gallery-thumbs', {
			spaceBetween: 10,
			slidesPerView: 4,
			touchRatio: 0.2,
			loop: true,
			loopedSlides: 5, //looped slides should be the same
			slideToClickedSlide: true,
		});
		galleryTop.controller.control = galleryThumbs;
		galleryThumbs.controller.control = galleryTop;

		// teamwork-swiper

		var swiper1 = new Swiper('.teamwork-cantainer', {
			slidesPerView: 5,
			// spaceBetween: 4,
			freeMode: true,
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true,
			// },
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		});

	}
})