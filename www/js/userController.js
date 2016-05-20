angular.module('userController', [])

	.controller('memberInfoCtrl', function($scope, $state, $ionicModal){
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


		$scope.selectHy = function(selectedHy){
			//console.log(selectedHy);
			$scope.hyName = selectedHy;
			return $scope.HyModal.hide();
		}

		if(!$scope.selectedHy){
			$scope.hyName = "互联网-软件";
		}



		//修改头像Modal
		$ionicModal.fromTemplateUrl('modifyTxModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.txModal = modal;
		})
		$scope.modifyTx = function() {
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
		$scope.modifyNick = function() {
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
		$scope.modifyGender = function() {
			$scope.GenderModal.show()
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
		$scope.modifyTel = function() {
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
		$scope.modifySignature = function() {
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
		$scope.modifyHy = function() {
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
		$scope.modifyCompany = function() {
			$scope.CompanyModal.show()
		}
		$scope.closeCompanyModal = function() {
			return $scope.CompanyModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.CompanyModal.remove();
		});

	})


	.controller('memberRecommendCtrl', function($scope, $state, $ionicModal){
		$scope.goBackIndex = function () {
			$state.go('tab.index');
		}

		$ionicModal.fromTemplateUrl('share.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.shareModal = modal;
		})
		$scope.openShareModal = function() {
			$scope.shareModal.show();
		}
		$scope.closeShareModal = function() {
			return $scope.shareModal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.shareModal.remove();
		});
	})


	.controller('memberFeedbackCtrl', function($scope, $state){
		$scope.goBackIndex = function () {
			$state.go('tab.index');
		}

	})


























