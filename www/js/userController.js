angular.module('userController', ['ngCordova'])

	.directive('groupedRadio', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				model: '=ngModel',
				value: '=groupedRadio'
			},
			link: function(scope, element, attrs, ngModelCtrl) {
				element.addClass('button');
				element.on('click', function(e) {
					scope.$apply(function() {
						ngModelCtrl.$setViewValue(scope.value);
					});
				});

				scope.$watch('model', function(newVal) {
					element.removeClass('button-positive');
					if (newVal === scope.value) {
						element.addClass('button-positive');
					}
				});
			}
		};
	})



	.controller('loginCtrl', function($scope,$rootScope,$interval, $state,$http,appInfo,$ionicPopup, AuthService,WECHAT, $ionicHistory){
		$scope.customer = {};
		$scope.verifyBtn = true;
		$scope.submitBtn = true;
		$scope.verifyBtnText = '验证';
    //$scope.isBindedWx = true;
    $scope.isBindedWx = false;
		//var customer_openid = 'df5sdfsd5fds6f5ds6fsd8erwhrt9ghrtyt8ryrty';

		$scope.$watch('customer.customer_telephone',function(){
			//console.log($scope.customer.customer_telephone);
			if(!angular.isUndefined($scope.customer.customer_telephone)){
				$scope.verifyBtn = false;
			}else{
				$scope.verifyBtn = true;
			}
		});



    function checkWxLogin(customer_openid){
      //var customer_thumb_url = customer_thumb_url ? customer_thumb_url : '';
      //return $http.get('http://app.tigonetwork.com/api/customer/checkWxLogin?customer_openid=' + customer_openid + '&customer_thumb_url=' + customer_thumb_url)
      return $http.get(appInfo.customerApi + '/checkWxLogin?customer_openid=' + customer_openid )
        .success(function(response) {
          return response.data;
        })
        .error(function(response){
          return response.status;
        })
    }

		//var customer_openid = "1234dd56789";
		//var customer_openid = "123456789";

    //Wechat.isInstalled(function (installed) {
    //  alert("Wechat installed: " + (installed ? "Yes" : "No"));
    //}, function (reason) {
    //  alert("Failed: " + reason);
    //});

    $scope.wechatAuth = function(){
      var scope = "snsapi_userinfo",
        state = "_" + (+new Date());
      Wechat.auth(scope, state, function (response) {
         //alert(JSON.stringify(response));
        //$scope.response = JSON.stringify(response);

        $http.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + WECHAT.AppID + '&secret=' + WECHAT.AppSecret + '&code=' + response.code + '&grant_type=authorization_code')
          .success(function(res){
            $scope.UnionID = res;

            //获取用户openid
            alert(res.openid);

            $scope.customer_openid = res.openid;

            var customer_openid = res.openid;
            checkWxLogin(customer_openid)
              .success(function(response){
                if(response.status && response.data.customer_telephone){
                  //
                  //alert(response);
                  alert(response.data.customer_id);
                  //alert(response.data.customer_telephone);

                  AuthService.checkedWxStoreCustomerId(response.data.customer_id).then(function(){
                    $state.go('tab.index', {}, { reload: true });
                  }, function(){
                    var alertPopup = $ionicPopup.alert({
                      title: '登录失败',
                      template: '验证信息不正确!'
                    });
                  });


                }else{
                  alert("未绑定微信或电话");
                  $scope.isBindedWx = true;
                  //$scope.getVerifyCode($scope.customer_telephone);
                }
              })
          })
          .error(function(res){
            alert('微信授权不成功!');
            console.log('微信授权不成功!');
          })
      }, function (reason) {
        //alert("Failed: " + reason);
        alert("微信授权不成功");
      });
    }








		$scope.getVerifyCode = function(customer_telephone){
			$http.get(appInfo.customerApi + '/getverifycode?customer_telephone=' + customer_telephone + '&customer_openid=' + $scope.customer_openid)
				.success(function(response){
					console.log(response.data);
					$scope.submitBtn = false;
					if(response.status){
						$scope.verifyBtn = true;
						$scope.verifyBtnText = 60;
						$rootScope.verifyCode = response.data.code;

						var timer = $interval(function () {
							$scope.verifyBtnText --;
						}, 1000);

						$scope.$watch('verifyBtnText',function(){
							if($scope.verifyBtnText == 0 || $scope.verifyBtnText<0){
								$interval.cancel(timer);
								$scope.verifyBtn = false;
								$scope.verifyBtnText = '验证';
							}
						})
					}
				})
		}

		$scope.register = function(customer_telephone){
			console.log($rootScope.verifyCode);
			console.log($scope.customer.code);
			if(parseInt($scope.customer.code) === parseInt($rootScope.verifyCode)){
				$http({
					method:'POST',
					url: appInfo.customerApi + '/register',
					data:{customer_openid:customer_openid,customer_telephone:customer_telephone, code:$scope.customer.code},
					headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
				})
					.success(function(response){
						console.log(response);
						console.log('注册成功');
						//$window.location.reload(true);
					})
					.error(function(response){
						console.log(response);
						console.log('注册失败');
					})
			}
		}

    //////////////////


    //$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    //    $scope.from = fromState.name;
    //});


    $scope.$on("$ionicView.enter", function(){
      $scope.loginData = {};
    })
    $scope.loginData = {};

    $scope.login = function(customer) {
      AuthService.login(customer.customer_telephone, customer.code, $scope.customer_openid).then(function(authenticated) {

        $state.go('tab.index', {}, { reload: true });
        //$state.go($scope.from, {}, { reload: true });

      }, function(err) {
        var alertPopup = $ionicPopup.alert({
          title: '登录失败',
          template: '验证信息不正确!'
        });
      });
    };



	})

	.controller('memberInfoCtrl', function($scope, $rootScope, $state, $ionicModal, $http, appInfo, $window, AuthService){
		$scope.goBackIndex = function () {
			$state.go('tab.index');
		}

		$scope.hyArray = [
			{id:1,name:"互联网－软件"},
			{id:2,name:"通信－硬件"},
			{id:3,name:"房地产－建筑"},
			{id:4,name:"文化传媒"},
			{id:5,name:"金融类"},
			{id:6,name:"消费品"},
			{id:7,name:"汽车－机械"},
			{id:8,name:"教育－翻译"},
			{id:9,name:"贸易－物流"},
			{id:10,name:"生物－医疗"},
			{id:11,name:"能源－化工"},
			{id:12,name:"政府机构"},
			{id:13,name:"服务业"},
			{id:14,name:"其他行业"}
		];

		if(!$scope.selectedHy){
			$scope.hyName = "互联网-软件";
		}

		if(!$scope.customer_gender){
			$scope.customer_gender = "男";
		}

		//获取并展示数据
		//var c_id = 1;

    $scope.customer_id = AuthService.get_Customer_id();
    //console.log($scope.customer_id);

		$http.get(appInfo.customerApi + '/getMemberInfo?customer_id=' + parseInt($scope.customer_id))
			.success(function(response){
				//console.log(response.data);
				$rootScope.userData = response.data;

				$scope.customer_industry = $rootScope.userData.customer_industry;

				//console.log($scope.customer_industry);
			})


		//更新生日

		$scope.modifyBirthday = function(customer_birthday){
			var birthday = customer_birthday.getFullYear() + '-' + parseInt(customer_birthday.getMonth()+1) + '-' + customer_birthday.getDate();
			if(customer_birthday != undefined){
				$http({
					method:'POST',
					url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
					data:{customer_id:$scope.customer_id,customer_birthday:birthday},
					headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
				})
					.success(function(response){
						//console.log(response);
						$rootScope.userData.customer_birthday = birthday;
						$window.location.reload(true);
					})
					.error(function(response){
						console.log(response);
					})
			}
		}




		$scope.selectHy = function(selectedHy){
			//console.log(selectedHy);
			$scope.hyName = selectedHy;
			//var c_id = 1;

			$http({
				method:'POST',
				url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
				data:{customer_id:$scope.customer_id, customer_industry:selectedHy},
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
				.success(function(response){
					//console.log(response);
					$window.location.reload(true);
				})
				.error(function(response){
					console.log(response);
				})

			return $scope.HyModal.hide();
		}




		//修改头像Modal
		$ionicModal.fromTemplateUrl('modifyTxModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.txModal = modal;
		})
		$scope.showModifyTx = function() {
			$scope.txModal.show()
		}
		$scope.closeTxModal = function() {
			return $scope.txModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.txModal.remove();
		});


		//修改昵称Modal
		$ionicModal.fromTemplateUrl('modifyNicknameModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.NickModal = modal;
		})
		$scope.showModifyNick = function() {
			$scope.NickModal.show()
		}
		$scope.closeNickModal = function() {
			return $scope.NickModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.NickModal.remove();
		});

		//修改性别Modal
		$ionicModal.fromTemplateUrl('modifyGenderModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.GenderModal = modal;
		})
		$scope.showModifyGender = function() {
			$scope.GenderModal.show();
		}
		$scope.closeGenderModal = function() {
			return $scope.GenderModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.GenderModal.remove();
		});


		//修改手机号码Modal
		$ionicModal.fromTemplateUrl('modifyTelModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.telModal = modal;
		})
		$scope.showModifyTel = function() {
			$scope.telModal.show()
		}
		$scope.closeTelModal = function() {
			return $scope.telModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.telModal.remove();
		});


		//修改个性签名Modal
		$ionicModal.fromTemplateUrl('modifySignatureModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.SignatureModal = modal;
		})
		$scope.showModifySignature = function() {
			$scope.SignatureModal.show()
		}
		$scope.closeSignatureModal = function() {
			return $scope.SignatureModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.SignatureModal.remove();
		});


		//修改行业
		$ionicModal.fromTemplateUrl('modifyHyModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.HyModal = modal;
		})
		$scope.showModifyHy = function() {
			$scope.HyModal.show();
		}
		$scope.closeHyModal = function() {
			return $scope.HyModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.HyModal.remove();
		});


		//修改公司职业
		$ionicModal.fromTemplateUrl('modifyCompanyModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.CompanyModal = modal;
		})
		$scope.showModifyCompany = function() {
			$scope.CompanyModal.show()
		}
		$scope.closeCompanyModal = function() {
			return $scope.CompanyModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.CompanyModal.remove();
		});

	})


	.controller('updateMemberInfoCtrl', function($scope, $http, appInfo, $state, $location, $ionicPlatform, $cordovaCamera, $ionicModal, $jrCrop, $cordovaFileTransfer, $window,AuthService){
		//var c_id = 1;
    $scope.customer_id = AuthService.get_Customer_id();

		$scope.modifyNickName = function(customer_nickname){
			$http({
				method:'POST',
				url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' +  $scope.customer_id,
				data:{customer_id: $scope.customer_id,customer_nickname:customer_nickname},
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
				.success(function(response){
					$window.location.reload(true);
				})
				.error(function(response){
					console.log(response);
				})
		}

		$scope.modifyGender = function(customer_gender){
			console.log(customer_gender);
			$http({
				method:'POST',
				url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
				data:{customer_id:$scope.customer_id,customer_gender:customer_gender},
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
				.success(function(response){
					//console.log(response);
					$window.location.reload(true);
				})
				.error(function(response){
					console.log(response);
				})
		}

		$scope.modifyDescription = function(customer_description){
			$http({
				method:'POST',
				url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
				data:{customer_id:$scope.customer_id,customer_description:customer_description},
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
				.success(function(response){
					console.log(response);
					$window.location.reload(true);
				})
				.error(function(response){
					console.log(response);
				})
		}

		$scope.modifyCompanyJob = function(customer_company, customer_job){
			$http({
				method:'POST',
				url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
				data:{customer_id:$scope.customer_id,customer_company:customer_company, customer_job:customer_job},
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
				.success(function(response){
					console.log(response);
					$window.location.reload(true);
				})
				.error(function(response){
					console.log(response);
				})
		}


    //修改并上传头像
    $ionicPlatform.ready(function() {
      $scope.modifyTx = function () {
        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,

          // allowEdit:true,
          popoverOptions: CameraPopoverOptions
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
          //var image = document.getElementById('myImage');
          //image.src = imageURI;
          //$scope.imageUrl = imageURI;
          $scope.crop(imageURI);
        }, function (err) {
          // error
        });
      }


      $scope.crop = function (image) {
        $jrCrop.crop({
          url: image,
          width: 200,
          height: 200,
          title: '',
          cancelText: '取消',
          chooseText: '确认'
        }).then(function (canvas) {

          // console.log(canvas);
          // console.log(canvas.toDataURL());

          //以DataURL形式上传，以下代码（一行）是可行的，可以成功上传到服务器，但是图片文件非常大。
          // $scope.testFileUpload(canvas.toDataURL());

          canvas.toBlob(function (image) {

            var formData = new FormData();
            formData.append('image', image);
            formData.append('customer_id', $scope.customer_id);

            $http({
              url: appInfo.customerApi + '/update_customer_avatar',
              method: 'post',
              headers: {
                'Content-Type': undefined
              },
              data: formData
            }).then(function (response) {
              //console.log(response);
              $window.location.reload(true);
            });
          }, "image/jpeg", 0.95);

        });
      };

    });

	})



	.controller('verifyTelephoneCtrl', function($scope,$rootScope,$state,$http,appInfo,$timeout, $ionicPlatform, $http, $ionicModal,$interval,$window,$location,AuthService){
		//var c_id=1;
    $scope.customer_id = AuthService.get_Customer_id();

		$scope.verifyBtn = true;
		$scope.submitBtn = true;
		$scope.verifyBtnText = '验证';

		$scope.$watch('customer_telephone',function(){
			if(!angular.isUndefined($scope.customer_telephone)){
				$scope.verifyBtn = false;
			}else{
				$scope.verifyBtn = true;
			}
		});

		$scope.getVerifyCode = function(customer_telephone){
			console.log(customer_telephone);

			$http.get(appInfo.customerApi + '/getverifycode?customer_telephone=' + customer_telephone + '&customer_id=' + $scope.customer_id)
				.success(function(response){
					console.log(response.data);
					$scope.submitBtn = false;
					if(response.status){
						$scope.verifyBtn = true;
						$scope.verifyBtnText = 60;
						$rootScope.verifyCode = response.data.code;

						var timer = $interval(function () {
							$scope.verifyBtnText --;
						}, 1000);

						$scope.$watch('verifyBtnText',function(){
							if($scope.verifyBtnText == 0 || $scope.verifyBtnText<0){
								$interval.cancel(timer);
								$scope.verifyBtn = false;
								$scope.verifyBtnText = '验证';
							}
						})
					}
				})
		}

		$scope.modifyTelephone = function(customer_telephone){
			console.log($rootScope.verifyCode);
			console.log($scope.code);
			if(parseInt($scope.code) === parseInt($rootScope.verifyCode)){
				console.log('ok');
				$http({
					method:'POST',
					url: appInfo.customerApi + '/updateCustomerInfo?customer_id=' + $scope.customer_id,
					data:{customer_id:$scope.customer_id,customer_telephone:customer_telephone, code:$scope.code},
					headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
				})
					.success(function(response){
						console.log(response);
						$window.location.reload(true);
					})
					.error(function(response){
						console.log(response);
					})
			}
		}





	})







	.controller('memberRecommendCtrl', function($scope, $state, $ionicModal, $ionicActionSheet, $ionicPopup){
		$scope.goBackIndex = function () {
			$state.go('tab.index');
		}


    $scope.shareTo = function(){
      var share = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-chatbubbles assertive"></i> 分享给微信好友' },
          { text: '<i class="icon ion-aperture assertive"></i> 分享到微信朋友圈' },
          { text: '<i class="icon ion-qr-scanner assertive"></i> 二维码' }
        ],
        titleText: '推荐分享',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          if(index == 0){
            Wechat.share({
              message: {
                title: "团居网房产中介平台",
                description: "团居网房产中介平台",
                thumb: "http://app.tigonetwork.com/public/img/shareLogo.jpg",
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: "http://www.tigonetwork.com/"
                }
              },
              scene: Wechat.Scene.SESSION
            }, function () {
              alert("分享成功");
            }, function (reason) {
              alert("分享失败: " + reason);
            });
          }else if(index == 1){
            Wechat.share({
              message: {
                title: "团居网房产中介平台",
                description: "团居网房产中介平台",
                thumb: "http://app.tigonetwork.com/public/img/shareLogo.jpg",
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {
                  type: Wechat.Type.WEBPAGE,
                  webpageUrl: "http://www.tigonetwork.com/"
                }
              },
              scene: Wechat.Scene.TIMELINE
            }, function () {
              alert("分享成功");
            }, function (reason) {
              alert("分享失败: " + reason);
            });
          }else if(index == 2){
            var alertPopup = $ionicPopup.alert({
              title: '扫描二维码关注公众号',
              buttons:[{text:'确定', type: 'button-positive'}],
              template: '<img src="img/code.jpg" style="width:100%;display:block;margin:0 auto;text-align: center;" />'
            });

            alertPopup.then(function(res) {

            });
          }else{
            return true;
          }
        }
      });
    }






		//$ionicModal.fromTemplateUrl('share.html', {
		//	scope: $scope,
		//	animation: 'slide-in-up'
		//}).then(function(modal) {
		//	$scope.shareModal = modal;
		//})
		//$scope.openShareModal = function() {
		//	$scope.shareModal.show();
		//}
		//$scope.closeShareModal = function() {
		//	return $scope.shareModal.hide();
		//};
		//$scope.$on('$destroy', function() {
		//	$scope.shareModal.remove();
		//});



	})









	.controller('memberFeedbackCtrl', function($scope, $http, $state, $ionicPopup, appInfo, AuthService){
		$scope.goBackIndex = function () {
			$state.go('tab.index');
		}

    $scope.feed = {
      content:''
    };

    var customer_id = AuthService.get_Customer_id();

    $scope.submitFeed = function(){
      $http({
        method:'POST',
        url: appInfo.commonApi + '/feedback',
        data:{ feedback_content: $scope.feed.content, customer_id:customer_id },
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
      })
        .success(function(response){
            var alertPopup = $ionicPopup.alert({
              title: '提示',
              template: '非常感谢您的反馈，我们会继续努力！'
            });

            alertPopup.then(function(res) {
              $state.go('tab.index');
            });
        })

        .error(function(){
          var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '反馈信息提交不成功，请稍后尝试！'
          });

          alertPopup.then(function(res) {
            $state.go('tab.index');
          });
        })
    }

	})


























