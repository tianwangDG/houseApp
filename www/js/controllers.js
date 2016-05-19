angular.module('starter.controllers', [])

.controller('indexCtrl', function($scope, $rootScope, $state, $ionicSlideBoxDelegate,$http, appInfo, Slider, House) {
	//显示滑动图片
	Slider.get().$promise.then(function(response){
		$scope.sliders = response.data;
		$ionicSlideBoxDelegate.update();
	})

	//楼盘数据展示
	$scope.showLpInit = {
		hasMore: true,
		page: 1
	};
	$scope.result = [];

	//楼盘数据
	//House.get({page:$scope.showLpInit.page}).$promise.then(function(response){
	//	$scope.fcData = response.data;
	//	//console.log($scope.fcData);
	//	$scope.result = $scope.fcData;
	//	console.log($scope.result);
	//});

	$scope.loadMore = function(){
		House.get({page:$scope.showLpInit.page}).$promise.then(function(response){
			if(response.data.length>0){
				response.data.forEach(function(item){
					$scope.result.push(item);
				})
			}
			if(response.data.length<10){
				$scope.showLpInit.hasMore = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
		$scope.showLpInit.page++;
	}

	//设置特色标签颜色
	$scope.colors = ["#f3541f","#326ed7","#653a78","#34ab55","#ffbc44","#039BE5","#009688","#536DFE","#AB47BC","#E53935","#3F51B5"];




	//筛选数据
	//初始化
	$scope.showFilterBox = false;
	$scope.showMoreFilterBox = false;
	$scope.arrowType = 'ion-arrow-up-b';
	$scope.items = [];
	$scope.queryArr = [];
	$scope.showTs = false;

		$scope.filter = [
			{id:1,lx:'zt',name:'状态',items:[{fid:1,lx:'zt',name:'毛坯'},{fid:2,lx:'zt',name:'清水'},{fid:3,lx:'zt',name:'简装'},{fid:4,lx:'zt',name:'精装'},{fid:5,lx:'zt',name:'豪装'}]},
			{id:2,lx:'qy',name:'区域',items:[{fid:1,lx:'qy',name:'不限'},{fid:2,lx:'qy',name:'市辖区'},{fid:3,lx:'qy',name:'东城区'},{fid:4,lx:'qy',name:'南城区'},{fid:5,lx:'qy',name:'万江区'},{fid:5,lx:'qy',name:'厚街区'}]},
			{id:3,lx:'zj',name:'总价',items:[{fid:1,lx:'zj',name:'100万以下'},{fid:2,lx:'zj',name:'100-150万'},{fid:3,lx:'zj',name:'150-200万'},{fid:4,lx:'zj',name:'200-250万'},{fid:5,lx:'zj',name:'250-300万'}]},
			{id:4,lx:'fx',name:'房型',items:[{fid:1,lx:'fx',name:'一房'},{fid:2,lx:'fx',name:'两房'},{fid:3,lx:'fx',name:'三房'},{fid:4,lx:'fx',name:'四房'},{fid:5,lx:'fx',name:'五房'}]},
			{id:5,lx:'ts',name:'特色',items:[{fid:1,lx:'ts',name:'不限',isChecked:false},{fid:2,lx:'ts',name:'精装修',isChecked:false},{fid:3,lx:'ts',name:'带花园',isChecked:false},{fid:4,lx:'ts',name:'近地铁',isChecked:false},{fid:5,lx:'ts',name:'带飘窗',isChecked:false},{fid:6,lx:'ts',name:'不限购',isChecked:false},{fid:7,lx:'ts',name:'复式',isChecked:false},{fid:8,lx:'ts',name:'品牌房企',isChecked:false}]},
			{id:6,lx:'sm',name:'售卖状态',items:[{fid:1,lx:'sm',name:'不限'},{fid:2,lx:'sm',name:'即将开盘'},{fid:3,lx:'sm',name:'排卡中'},{fid:4,lx:'sm',name:'在售'},{fid:5,lx:'sm',name:'售罄'}]}
		];


		$scope.ztItem = [
			{id:1,lx:'zt',name:'毛坯'},
			{id:2,lx:'zt',name:'清水'},
			{id:3,lx:'zt',name:'简装'},
			{id:4,lx:'zt',name:'精装'},
			{id:5,lx:'zt',name:'豪装'}
		];
		$scope.qyItem = [
			{id:1,lx:'qy',name:'不限'},
			{id:2,lx:'qy',name:'市辖区'},
			{id:3,lx:'qy',name:'东城区'},
			{id:4,lx:'qy',name:'南城区'},
			{id:5,lx:'qy',name:'万江区'},
			{id:6,lx:'qy',name:'厚街区'}
		];
		$scope.zjItem = [
			{id:1,lx:'zj',name:'100万以下'},
			{id:2,lx:'zj',name:'100-150万'},
			{id:3,lx:'zj',name:'150-200万'},
			{id:4,lx:'zj',name:'200-250万'},
			{id:5,lx:'zj',name:'250-300万'}
		];
		$scope.fxItem = [
			{id:1,lx:'fx',name:'一房'},
			{id:2,lx:'fx',name:'两房'},
			{id:3,lx:'fx',name:'三房'},
			{id:4,lx:'fx',name:'四房'},
			{id:5,lx:'fx',name:'五房'}
		];
		$scope.tsItem = [
			{id:1,lx:'ts',name:'不限'},
			{id:2,lx:'ts',name:'精装修'},
			{id:3,lx:'ts',name:'带花园'},
			{id:4,lx:'ts',name:'近地铁'},
			{id:5,lx:'ts',name:'带飘窗'},
			{id:6,lx:'ts',name:'不限购'}
		];
		$scope.smItem = [
			{id:1,lx:'sm',name:'不限'},
			{id:2,lx:'sm',name:'即将开盘'},
			{id:3,lx:'sm',name:'排卡中'},
			{id:4,lx:'sm',name:'在售'},
			{id:5,lx:'sm',name:'售罄'}
		];
		$scope.filterType = [
			{id:1,lx:'zt',name:'状态'},
			{id:2,lx:'qy',name:'区域'},
			{id:3,lx:'zj',name:'总价'},
			{id:4,lx:'fx',name:'房型'},
			{id:5,lx:'ts',name:'特色'},
			{id:6,lx:'sm',name:'售卖状态'},
		];



	$scope.showFilter = function(id,lx,$index){
		//console.log(id);
		//console.log(lx);
		//console.log($index);
		//console.log($scope.filter[$index]['items']);
		$scope.items = $scope.filter[$index]['items'];

		$scope.showMoreFilterBox = false;

		//控制下拉栏显示与隐藏
		if($scope.showFilterBox){
			$scope.showFilterBox = !$scope.showFilterBox;
		}
		$scope.showFilterBox = !$scope.showFilterBox;
		$scope.key = id;

		$scope.filterItems = function(lx,fid,$index){
			//console.log(lx);
			//console.log(fid);
			//console.log($index);
			$scope.showFilterBox = false;
			//回填筛选字段
			$scope.filter.forEach(function(item){
				if(item.lx == lx){
					//console.log(item);
					item.name = item.items[$index].name;
					$scope.mark = true;
				}
			})

			$scope.queryArr[lx] = {fid:fid};
			console.log($scope.queryArr);
		}
	}


	/************************************/

	House.get({filter:[{House_sale_status:3},{house_zone_id:3}],page:$scope.showLpInit.page}).$promise.then(function(response){
		console.log(response);
		//if(response.data.length>0){
		//	response.data.forEach(function(item){
		//		$scope.result.push(item);
		//	})
		//}
		//if(response.data.length<10){
		//	$scope.showLpInit.hasMore = false;
		//}
		//$scope.$broadcast('scroll.infiniteScrollComplete');
	});



	/************************************/


	$scope.showMoreFilter = function($filterFactor) {
		$scope.showFilterBox = false;
		$scope.moreItems = [];
		$scope.showMoreFilterBox = !$scope.showMoreFilterBox;
		if($scope.moreItems.length == 0){
			//$scope.moreItems =$scope.filter[4].items;
			$scope.ts = $scope.filter[4].items;
			$scope.showTs = true;
		}

		$scope.moreTs = function(lx){
			$scope.showTs = true;
			$scope.ts = $scope.filter[4].items;
		}

		$scope.moreFilterItem = function(moreFilterLx) {
			for(var i=0; i<$scope.filter.length;i++){
				if($scope.filter[i].lx == moreFilterLx){
					$scope.moreItems = $scope.filter[i].items;
					$scope.showTs = false;
				}
			}
		}
	}

	$tsFilterArr = [];

	$scope.getCheck = function(tsItem){
		console.log(tsItem.isChecked);
		console.log(tsItem.fid);

		$tsFilterArr[tsItem.fid] = tsItem.isChecked;

		console.log($tsFilterArr);
	}

	$scope.submitTs = function(){
		$scope.showMoreFilterBox = false;
	}


	$scope.moreFilterItems = function(lx,fid,$index){
		//console.log(fid);
		//console.log(lx);
		//console.log($index);

		$scope.showMoreFilterBox = false;
		$scope.queryArr[lx] = {fid:fid};

		console.log($scope.queryArr);
	}

})

.controller('houseCtrl', function($scope,$stateParams,HouseDetail,$state){
	//console.log($stateParams.id);
	var house_id = parseInt($stateParams.id);
	HouseDetail.get({id:house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		$scope.descs = $scope.lpInfo.house_description.split(',');
	});

	$scope.onSwipeUp = function(){
		$state.go('houseTab.ybj', { house_id: house_id });
	}

})


/** 楼盘详情页面controller **/

.controller('houseDetailCtrl', function($scope,$rootScope,$state){
	$scope.gotoYbj = function(){
		$state.go('houseTab.ybj',{house_id:$rootScope.id});
	}
	$scope.gotoSjt = function(){
		$state.go('houseTab.sjt',{house_id:$rootScope.id});
	}
	$scope.gotoZsl = function(){
		$state.go('houseTab.zsl',{house_id:$rootScope.id});
	}
	$scope.gotoZb = function(){
		$state.go('houseTab.zb',{house_id:$rootScope.id});
	}
})


.controller('houseYbjCtrl', function($scope,$rootScope,$stateParams,HouseDetail,$ionicSlideBoxDelegate,$state){
	//console.log($stateParams.id);
	var house_id = parseInt($stateParams.house_id);
	if(house_id){
		$scope.house_id = house_id;
		$rootScope.id = house_id;
	}else if($rootScope.id){
		$scope.house_id = $rootScope.id;
	}else{
		$scope.house_id = $rootScope.id;
	}
	//console.log($rootScope.id);
	$scope.house_featured = [];
	HouseDetail.get({id:$scope.house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		$ionicSlideBoxDelegate.update();

		//过滤“不限”特色字段
		$scope.lpInfo.house_featured.forEach(function(item){
			if(item !== '不限'){
				$scope.house_featured.push(item);
			}
		})
	});

	//设置特色标签颜色
	$scope.colors = ["#f3541f","#326ed7","#653a78","#34ab55","#ffbc44","#039BE5","#009688","#536DFE","#AB47BC","#E53935","#3F51B5"];
})


.controller('houseSjtCtrl', function($scope,$rootScope,$stateParams,HouseDetail,$ionicSlideBoxDelegate,$state){
	//console.log($rootScope.id);
	var house_id = $rootScope.id;
	$scope.house_id = house_id;
	$rootScope.id = $scope.house_id;

	$scope.house_featured = [];
	HouseDetail.get({id:house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		$ionicSlideBoxDelegate.update();

		//过滤“不限”特色字段
		$scope.lpInfo.house_featured.forEach(function(item){
			if(item !== '不限'){
				$scope.house_featured.push(item);
			}
		})
	});

	//设置特色标签颜色
	$scope.colors = ["#f3541f","#326ed7","#653a78","#34ab55","#ffbc44","#039BE5","#009688","#536DFE","#AB47BC","#E53935","#3F51B5"];
})


.controller('houseZslCtrl', function($scope,$rootScope,$stateParams,HouseDetail,$ionicSlideBoxDelegate, $ionicScrollDelegate, $window, $state) {
	var house_id = $rootScope.id;

	HouseDetail.get({id:house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		$scope.sliderArr = $scope.lpInfo.apartments;

		$scope. map = {
			ld: $scope.lpInfo.buildings,
			px: $scope.lpInfo.house_distribution_image_origin_width,
			py: $scope.lpInfo.house_distribution_image_origin_height
		}
		console.log($scope.lpInfo);
		console.log($scope.sliderArr);
		console.log($scope.map);
		$ionicSlideBoxDelegate.update();
	});

	$scope.options = {
		loop: true,
		effect: 'slide',
		speed: 500,
		spaceBetween:20,
		slidesPerView:2,
		initialSlide:1,
		slidesPerColumn:0,
		slidesPerColumnFill:'column',
		centeredSlides:true,
		slidesOffsetBefore:0,
		slidesOffsetAfter:0,
		paginationHide:true,

		onInit: function(swiper){
			console.log(swiper.activeIndex);
		},

		onSlideChangeEnd: function(swiper){
			console.log('The active index is ' + ( swiper.activeIndex ));

			//if(swiper.activeIndex){
			//	$scope.onSliderShow(swiper.activeIndex-1);
			//}else{
			//	$scope.onSliderShow(0);
			//}


		}
	}


	$scope.onSliderShow = function(index){

		var ldId = parseInt($scope.sliderArr[index-1].building_id) - 1;
		console.log(ldId);

		//console.log($scope.map.ld);
		//console.log($scope.map.ld[ldId].x);
		//console.log($scope.map.ld[ldId].y);

		$scope.changeXY($scope.map.ld[ldId].building_position_x - $window.screen.availWidth/2 ,$scope.map.ld[ldId].building_position_y - 150);

	}

	setTimeout(function(){
		$scope.$broadcast('scroll.resize');
	}, 2000);

	$scope.ldLabels = [];

	$scope.changeXY = function(x,y){
		$ionicScrollDelegate.scrollTo(x,y);
	}

	$scope.goToHx = function(index){
		//console.log(index);
		//console.log($scope.sliderArr[index]);
		//console.log($scope.sliderArr[index].id);
		$state.go('houseTab.hx', {hxId:index,house_id: $rootScope.id});
	}

	$scope.goToLd = function(){
		$state.go('houseTab.ld', {house_id: $rootScope.id});
	}
})


.controller('houseHxCtrl', function($scope, $stateParams, HouseDetail, $ionicHistory){
	console.log($stateParams);
	$scope.hx_id = parseInt($stateParams.hxId);
	$scope.house_id = parseInt($stateParams.house_id);

	HouseDetail.get({id:$scope.house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		console.log($scope.lpInfo);

		$scope.lpInfo.apartments.forEach(function(item){
			if(item.apartment_id == $scope.hx_id){
				$scope.hxInfo = item;
			}
		})

	});

})


.controller('houseLdCtrl', function($scope, $stateParams, HouseDetail, $ionicHistory, $ionicScrollDelegate, $window){
	$scope.house_id = parseInt($stateParams.house_id);

	HouseDetail.get({id:$scope.house_id}).$promise.then(function(response){
		$scope.lpInfo = response.data;
		$scope. map = {
			ld: $scope.lpInfo.buildings,
			px: $scope.lpInfo.house_distribution_image_origin_width,
			py: $scope.lpInfo.house_distribution_image_origin_height
		}
	});
})



	.controller('houseZbCtrl', function($scope, $stateParams, $ionicHistory, $rootScope, $http, $ionicPopup, $cordovaGeolocation){

		$scope.goBack = function(){
			$ionicHistory.goBack();
		};

		$scope.zbpts = [
			{id:1,name:"zbxx",type:"学校",icon:"zbxx",iconOn:"zbxxOn",imgOff:"img/zbicon/zbxx.png",imgOn:"img/zbicon/zbxxOn.png"},
			{id:2,name:"zbcs",type:"超市",icon:"zbcs",iconOn:"zbcsOn",imgOff:"img/zbicon/zbcs.png",imgOn:"img/zbicon/zbcsOn.png"},
			{id:3,name:"zbdt",type:"地铁",icon:"zbdt",iconOn:"zbdtOn",imgOff:"img/zbicon/zbdt.png",imgOn:"img/zbicon/zbdtOn.png"},
			{id:4,name:"zbjd",type:"酒店",icon:"zbjd",iconOn:"zbjdOn",imgOff:"img/zbicon/zbjd.png",imgOn:"img/zbicon/zbjdOn.png"},
			{id:5,name:"zbsc",type:"市场",icon:"zbsc",iconOn:"zbscOn",imgOff:"img/zbicon/zbsc.png",imgOn:"img/zbicon/zbscOn.png"},
			{id:6,name:"zbyy",type:"医院",icon:"zbyy",iconOn:"zbyyOn",imgOff:"img/zbicon/zbyy.png",imgOn:"img/zbicon/zbyyOn.png"},
			{id:7,name:"zbms",type:"美食",icon:"zbms",iconOn:"zbmsOn",imgOff:"img/zbicon/zbms.png",imgOn:"img/zbicon/zbmsOn.png"}
		];

		$scope.popupBox = function(title,text,button){
			return $ionicPopup.alert({
				title: title,
				template: text,
				okText: button
			});
		};

		$scope.getZbMap = function(type,lon,lat){
			var map = new BMap.Map("allmap");
			map.centerAndZoom(new BMap.Point(lon, lat), 14);

			var local = new BMap.LocalSearch(map, {
				renderOptions:{map: map}
			});
			local.searchInBounds(type, map.getBounds());

			map.addEventListener("dragend",function(){
				map.clearOverlays();
				local.searchInBounds(type, map.getBounds());
			});
		}

		$scope.getPosition = function(type){
			if(type == undefined){
				var type = $scope.zbpts[0].type;
			}
			$scope.getZbMap(type,113.76724360543,23.024699455239);
		}

		$scope.getPosition();

	})










.controller('carCtrl', function($scope) {

})

.controller('concernCtrl', function($scope) {

})

.controller('messageCtrl', function($scope) {

});
