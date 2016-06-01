angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'userController', 'calculator', 'concernController','messageController', 'ngCordova','ion-datetime-picker','jrCrop'])

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
  commonApi:'http://app.tigonetwork.com/api/common',
	apiUrl: 'http://app.tigonetwork.com/api',
	customerApi: 'http://app.tigonetwork.com/api/customer'
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER', {
  customer_id: null
})


//日期时间选择器：ion-datetime-picker
.run(function($ionicPickerI18n) {
    $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    $ionicPickerI18n.ok = "确定";
    $ionicPickerI18n.cancel = "取消";
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, USER) {
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
        controller: 'concernCtrl',
        data:{
          customer_id: USER.customer_id
        }
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
  })

  .state('tab.guide', {
      url: '/guide',
      views: {
        'tab-car': {
          templateUrl: 'templates/tab-guide.html',
          controller: 'guideCtrl'
        }
      }
    })

  .state('tab.about', {
      url: '/about',
      views: {
        'tab-index': {
          templateUrl: 'templates/tab-about.html',
          controller: 'aboutCtrl'
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
			url:'/houseYbj/:house_id',
            views: {
              'house-ybj':{
                templateUrl: 'templates/house-ybj1.html',
                controller: 'houseYbjCtrl'
              }
            }
		})
		.state('houseTab.sjt',{
			url:'/houseSjt/:house_id',
            views: {
              'house-sjt':{
                templateUrl: 'templates/house-sjt2.html',
                controller: 'houseSjtCtrl'
              }
            }
		})
		.state('houseTab.zsl',{
			url:'/houseZsl/:house_id',
            views: {
              'house-zsl':{
                templateUrl: 'templates/house-zsl3.html',
                controller: 'houseZslCtrl'
              }
            }
		})
		.state('houseTab.hx',{
			url:'/houseHx/:hxId/:house_id',
            views: {
              'house-zsl':{
                templateUrl: 'templates/house-Hx.html',
                controller: 'houseHxCtrl'
              }
            }
		})
		.state('houseTab.ld',{
			url:'/houseLd/:house_id',
            views: {
              'house-zsl':{
                templateUrl: 'templates/house-Ld.html',
                controller: 'houseLdCtrl'
              }
            }
		})
        .state('houseZb',{
          url:'/houseZb/:house_id',
          templateUrl: 'templates/house-zb4.html',
          controller: 'houseZbCtrl',
          resolve:{
            zbInfo:function($stateParams,HouseDetail){
              return (
                HouseDetail.get({id:$stateParams.house_id}).$promise.then(function(response){
                  return {house_name:response.data.house_name,lat: response.data.house_latitude,lon:response.data.house_longtitude};
                })
              );
            }
          }
        });




    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl: 'templates/login.html',
            controller:'loginCtrl',
            data:{
              customer_id: USER.customer_id
            }
        })
        .state('memberInfo',{
            url:'/memberInfo',
            templateUrl: 'templates/memberInfo.html',
            controller:'memberInfoCtrl',
            data:{
              customer_id: USER.customer_id
            }
        })
        .state('memberRecommend',{
            url:'/memberRecommend',
            templateUrl: 'templates/memberRecommend.html',
            controller:'memberRecommendCtrl'
        })
        .state('memberFeedback',{
            url:'/memberFeedback',
            templateUrl: 'templates/memberFeedback.html',
            controller:'memberFeedbackCtrl'
        })
        .state('calculator',{
            url:'/calculator',
            templateUrl: 'templates/calculator.html',
            controller:'calculatorCtrl'
        })

      .state('pk', {
        url: '/pk?param',
        templateUrl: 'templates/pk.html',
        controller: 'pkCtrl'
      })

      //.state('getDiscount',{
      //  url:'/getDiscount?customer_id?house_id',
      //  templateUrl: 'templates/getDiscount.html',
      //  controller:'getDiscountCtrl',
      //  data:{
      //    customer_id: USER.customer_id
      //  }
      //})

      .state('getDiscount',{
        url:'/getDiscount/:customer_id/:house_id',
        templateUrl: 'templates/getDiscount.html',
        controller:'getDiscountCtrl',
        data:{
          customer_id: USER.customer_id
        }
      })


      //.state('pk', {
      //  url: '/pk?param',
      //  templateUrl: 'templates/pk.html',
      //  controller: 'pkCtrl'
      //})
      //

  $urlRouterProvider.otherwise('/tab/index');

})



  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

       //console.log(event);
       //console.log(next);
       //console.log(nextParams);
       //console.log(fromState);

      if ('data' in next && 'customer_id' in next.data) {
        var customer_id = next.data.customer_id;
        if (!AuthService.isAuthorized(customer_id)) {
          console.log(customer_id);
          event.preventDefault();
          $state.go($state.next, {}, {reload: true});
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      }

      if (!AuthService.isAuthenticated()) {
        if (next.name == 'memberInfo' || next.name == 'tab.concern') {
          event.preventDefault();
          $state.go('login');
        }
      }

    });
  });




















