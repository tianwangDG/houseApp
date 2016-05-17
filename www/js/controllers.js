angular.module('starter.controllers', [])

.controller('indexCtrl', function($scope, $rootScope, $state, $ionicSlideBoxDelegate,$http, appInfo, Slider, House) {
	//显示滑动图片
	Slider.get().$promise.then(function(response){
		$scope.sliders = response.data;
		$ionicSlideBoxDelegate.update();
	})


	//筛选数据


	$scope.showLpInit = {
		hasMore: true,
		page: 1
	};
	$scope.result = [];


	//楼盘数据
	House.get({page:$scope.showLpInit.page}).$promise.then(function(response){
		$scope.fcData = response.data;
		//console.log($scope.fcData);
		$scope.result = $scope.fcData;
		console.log($scope.result);
	});

	$scope.loadMore = function(){
		//console.log('dd');
		$scope.showLpInit.page++;
		House.get({page:$scope.showLpInit.page}).$promise.then(function(response){
			console.log($scope.showLpInit.page);
			console.log(response.data);
			if(response.data.length>0){
				for(var i=0;i<response.data.length;i++){
					$scope.result.push(response.data[i]);
				}
			}
			if(response.data.length<10){
				$scope.showLpInit.hasMore = false;
			}

		});
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}




	//设置特色标签颜色
	$scope.colors = ["#f3541f","#326ed7","#653a78","#34ab55","#ffbc44","#039BE5","#009688","#536DFE","#AB47BC","#E53935","#3F51B5"];






})

.controller('carCtrl', function($scope) {

})

.controller('concernCtrl', function($scope) {

})

.controller('messageCtrl', function($scope) {

});
