angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$state,$ionicHistory) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

	$rootScope.goBack = function () {
		$ionicHistory.goBack();
	}

	$rootScope.goToIndex = function(){
		$state.go('tab.index');
	};
})

.constant('appInfo', {
	apiUrl: 'http://app.tigonetwork.com/api',
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
//.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, ionicDatePickerProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo|mailto|tel|maps):/);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);


  //日期选择器
  //var datePickerObj = {
  //  inputDate: new Date(),
  //  setLabel: '确定',
  //  todayLabel: '今天',
  //  closeLabel: '关闭',
  //  mondayFirst: false,
  //  weeksList: ["日", "一", "二", "三", "四", "五", "六"],
  //  monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  //  templateType: 'popup',
  //  from: new Date(2016, 1, 1),
  //  to: new Date(2030, 12, 31),
  //  showTodayButton: true,
  //  dateFormat: 'yyyy - MM - dd',
  //  closeOnSelect: false,
  //  disableWeekdays: [],
  //};
  //ionicDatePickerProvider.configDatePicker(datePickerObj);


  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  .state('tab.index', {
    url: '/index',
    views: {
      'tab-index': {
        templateUrl: 'templates/tab-index.html',
        controller: 'indexCtrl'
      }
    }
  })

  .state('tab.house',{
	  url:'/house/:id',
	  views: {
		  'tab-index':{
			  templateUrl: 'templates/tab-house.html',
			  controller:'houseCtrl'
		  }
	  }
  })



  .state('tab.car', {
      url: '/car',
      views: {
        'tab-car': {
          templateUrl: 'templates/tab-car.html',
          controller: 'carCtrl'
        }
      }
    })

  .state('tab.concern', {
    url: '/concern',
    views: {
      'tab-concern': {
        templateUrl: 'templates/tab-concern.html',
        controller: 'concernCtrl'
      }
    }
  })

  .state('tab.message', {
	  url: '/message',
	  views: {
		  'tab-message': {
			  templateUrl: 'templates/tab-message.html',
			  controller: 'messageCtrl'
		  }
	  }
  });



	$stateProvider
		.state('houseTab', {
			url: '/houseTab',
			abstract: true,
			templateUrl: 'templates/houseTabs.html',
			controller:'houseDetailCtrl'
		})
		.state('houseTab.ybj',{
			url:'/houseYbj/:id',
			templateUrl: 'templates/house-ybj1.html',
			controller:'houseYbjCtrl'
		})
		.state('houseTab.sjt',{
			url:'/houseSjt/:id',
			templateUrl: 'templates/house-sjt2.html',
			controller:'houseSjtCtrl'
		})
		.state('houseTab.zsl',{
			url:'/houseZsl',
			templateUrl: 'templates/house-zsl3.html',
			controller:'houseZslCtrl'
		})
		.state('houseTab.hx',{
			url:'houseHx/:hxId',
			templateUrl: 'templates/house-Hx.html',
			controller: 'houseHxCtrl'
		})
		.state('houseTab.ld',{
			url:'/houseLd',
			templateUrl: 'templates/house-Ld.html',
			controller:'houseLdCtrl'
		})
		.state('houseTab.zb',{
			url:'/houseZb',
			templateUrl: 'templates/house-zb4.html',
			controller:'houseZbCtrl'
		})

  $urlRouterProvider.otherwise('/tab/index');

});
