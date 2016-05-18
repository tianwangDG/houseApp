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
		$state.go('houseTab.ybj',{id:house_id});
	}

})


/** 楼盘详情页面controller **/

.controller('houseDetailCtrl', function($scope,$rootScope,$state){
	$scope.gotoYbj = function(){
		$state.go('houseTab.ybj',{id:$rootScope.id});
	}
	$scope.gotoSjt = function(){
		$state.go('houseTab.sjt',{id:$rootScope.id});
	}
})


.controller('houseYbjCtrl', function($scope,$rootScope,$stateParams,HouseDetail,$ionicSlideBoxDelegate,$state){
	//console.log($stateParams.id);
	var house_id = parseInt($stateParams.id);
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














.controller('carCtrl', function($scope) {

})

.controller('concernCtrl', function($scope) {

})

.controller('messageCtrl', function($scope) {

});
