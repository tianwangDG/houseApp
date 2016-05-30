angular.module('calculator', [])

.controller('calculatorCtrl', function($scope, $state, $ionicModal, $timeout, $ionicPopup, $rootScope){
    $scope.goBackIndex = function () {
      $state.go('tab.dash');
    }

    //封装计算函数
    $scope.js = function(hkfs,fjze,sfbl,dkze,dknx,dkll){
      var yjhk = 0;
      var hkze = 0;
      var zflx = 0;
      var dkys = 0;
      var syhk = 0;

      if(dkze > fjze * ( 10 - sfbl ) / 10 ){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
      }

      dkys = dknx * 12;

      switch(hkfs){
        case '等额本息':
          yjhk = Math.round(((dkze*10000*(dkll*0.01/12)*Math.pow((1+dkll*0.01/12),dkys))/(Math.pow((1+dkll*0.01/12),dkys)-1))*100)/100;
          hkze = Math.round(yjhk * dkys*100)/100;
          zflx = Math.round((hkze - dkze*10000)*100)/100;
          hk = '月均还款';
          break;
        case '等额本金':
          var monthBJ = dkze*10000/(dknx * 12);
          var monthBX = dkze*10000*dkll*0.01/12;
          syhk = Math.round((monthBJ + monthBX)*100)/100;
          yjhk = syhk;  //在等额本息方式下为月均还款，在等额本金下为首月还款
          zflx = Math.round((dkze*10000 * dkll*0.01/12 * ( dkys + 1 )/2)*100)/100;
          hkze = Math.round((dkze*10000 + zflx)*100)/100;
          hk = '首月还款';
          break;
      }

      return {
        hkze:hkze,
        dkys:dkys,
        zflx:zflx,
        yjhk:yjhk,
        hk:hk
      };
    }

    //$scope.hkfs = '等额本息';
    $scope.hkfsArray = [{id:1,name:'等额本息'},{id:2,name:'等额本金'}]
    $scope.hkfs = '等额本息';
    $scope.hk = '月均还款';

    $scope.sfblArray = [
      {id:1,name:'1成'},
      {id:2,name:'2成'},
      {id:3,name:'3成'},
      {id:4,name:'4成'},
      {id:5,name:'5成'},
      {id:6,name:'6成'},
      {id:7,name:'7成'},
      {id:8,name:'8成'},
      {id:9,name:'9成'},
      {id:10,name:'10成'}
    ];

    $scope.dknxArray = [
      {id:1,name:'1年'},
      {id:2,name:'2年'},
      {id:3,name:'3年'},
      {id:4,name:'4年'},
      {id:5,name:'5年'},
      {id:6,name:'6年'},
      {id:7,name:'7年'},
      {id:8,name:'8年'},
      {id:9,name:'9年'},
      {id:10,name:'10年'},
      {id:11,name:'11年'},
      {id:12,name:'12年'},
      {id:13,name:'13年'},
      {id:14,name:'14年'},
      {id:15,name:'15年'},
      {id:16,name:'16年'},
      {id:17,name:'17年'},
      {id:18,name:'18年'},
      {id:19,name:'19年'},
      {id:20,name:'20年'},
      {id:21,name:'21年'},
      {id:22,name:'22年'},
      {id:23,name:'23年'},
      {id:24,name:'24年'},
      {id:25,name:'25年'},
      {id:26,name:'26年'},
      {id:27,name:'27年'},
      {id:28,name:'28年'},
      {id:29,name:'29年'},
      {id:30,name:'30年'},
    ];

    //公积金贷款利率
    $scope.gjjDkllArray = [
      {id:1,ll:2.75,minYear:0,maxYear:5,name:"2015年月10月24日基准利率(2.75%)"},
      {id:2,ll:3.25,minYear:5,maxYear:30,name:"2015年月10月24日基准利率(3.25%)"}
    ];

    //商业贷款基准利率
    $scope.syjzllArray = [
      {id:1,ll:4.35,minYear:0,maxYear:1,name:"2015年10月24日基准利率(4.35%)",label:'一年以下'},
      {id:2,ll:4.75,minYear:1,maxYear:5,name:"2015年10月24日基准利率(4.75%)",label:'一至五年'},
      {id:3,ll:4.90,minYear:5,maxYear:30,name:"2015年10月24日基准利率(4.9%)",label:'五年以上'}
    ];

    //商业贷款利率折扣
    $scope.sydkllArray = [
      {id:1,llzk:1.00,name:"2015年10月24日基准利率(4.9%)"},
      {id:2,llzk:0.70,name:"2015年10月24日利率下限（7折）"},
      {id:3,llzk:0.85,name:"2015年10月24日利率下限（85折）"},
      {id:4,llzk:0.88,name:"2015年10月24日利率下限（88折）"},
      {id:5,llzk:0.90,name:"2015年10月24日利率下限（9折）"},
      {id:6,llzk:1.10,name:"2015年10月24日利率下限（1.1倍）"}
    ];

    //初始化
    $scope.fjze = 100;
    $scope.sfbl = 3;
    $scope.dknx = 20;

    //组合贷款-公积金贷款额度
    $scope.gjjdked = 30;
    //组合贷款-商业贷款额度
    $scope.sydked = 40;

    if(!$scope.dkll){
      $scope.syjzllArray.forEach(function(syDkll){
        if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
          $scope.dkll = syDkll.ll;
          $scope.dkllName = syDkll.name;
        }
      });
    }

    $scope.active_content = 'sydk';
    $rootScope.active_content = 'sydk';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
      $rootScope.active_content = active_content;

      switch($rootScope.active_content){
        case 'gjjdk':
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            //console.log(gjjDkll);
            if($scope.dknx >= gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.dkll = gjjDkll.ll;
              $scope.dkllName = gjjDkll.name;
            }
          });
          break;
        case 'sydk':
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
        case 'zhdk':
          //获取公积金贷款利率
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            //console.log(gjjDkll);
            if($scope.dknx >= gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.gjjDkllZh = gjjDkll.ll;
            }
          });
          //获取商业贷款利率
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.syDkllZh = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });


          //watch组合贷款额度
          //$scope.$watch('gjjdked + sydked', function(){
          //  $scope.gjjdked = $scope.dkze - $scope.sydked;
          //  $scope.sydked = $scope.dkze - $scope.gjjdked;
          //});

          break;
      }

    }


    //首付比例
    $ionicModal.fromTemplateUrl('sfbl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sfblModal = modal;
    })
    $scope.openSfblModal = function() {
      $scope.sfblModal.show();
    }
    $scope.closeSfblModal = function() {
      return $scope.sfblModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.sfblModal.remove();
    });

    $scope.selectSfbl = function(sfblId){
      $scope.sfbl = parseInt(sfblId);
      $scope.closeSfblModal();
    }

    //贷款年限
    $ionicModal.fromTemplateUrl('dknx.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.dknxModal = modal;
    })
    $scope.openDknxModal = function() {
      $scope.dknxModal.show();
    }
    $scope.closeDknxModal = function() {
      return $scope.dknxModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.dknxModal.remove();
    });

    $scope.selectDknx = function(dknxId){
      $scope.dknx = parseInt(dknxId);
      //利率确定
      switch($rootScope.active_content){
        case 'gjjdk':
          //console.log($rootScope.active_content);
          $scope.gjjDkllArray.forEach(function(gjjDkll){
            if($scope.dknx > gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
              $scope.dkll = gjjDkll.ll;
              $scope.dkllName = gjjDkll.name;
            }
          });
          break;
        case 'sydk':
          //console.log($rootScope.active_content);
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
        case 'zhdk':
          $scope.syjzllArray.forEach(function(syDkll){
            if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
              $scope.dkll = syDkll.ll;
              $scope.dkllName = syDkll.name;
            }
          });
          break;
      }
      $scope.closeDknxModal();
    }


    //商业贷款利率
    $ionicModal.fromTemplateUrl('sydkllModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sydkllModal = modal;
    })
    $scope.openSydkllModal = function() {
      $scope.sydkllModal.show();
    }
    $scope.closeSydkllModal = function() {
      return $scope.sydkllModal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.sydkllModal.remove();
    });

    $scope.selectSydkll = function(sydkllId){
      $scope.sydkllId = parseInt(sydkllId);
      //利率确定
      $scope.sydkzk = $scope.sydkllArray[$scope.sydkllId - 1].llzk;
      $scope.dkllName = $scope.sydkllArray[$scope.sydkllId - 1].name;

      $scope.closeSydkllModal();
    }

    //组合贷款利率
    $scope.$watch('dknx',function(){
      $scope.gjjDkllArray.forEach(function(gjjDkll){
        //console.log(gjjDkll);
        if($scope.dknx > gjjDkll.minYear && $scope.dknx <= gjjDkll.maxYear ){
          $scope.gjjDkllZh = gjjDkll.ll;
        }
      });
      //获取商业贷款利率
      $scope.syjzllArray.forEach(function(syDkll){
        if($scope.dknx > syDkll.minYear && $scope.dknx <= syDkll.maxYear ){
          $scope.syDkllZh = syDkll.ll;
          $scope.dkllName = syDkll.name;
        }
      });
    });



    var getDkze = function(){
      $scope.dkze = Math.round($scope.fjze * (1 - $scope.sfbl/10)*100)/100;
    }
    $scope.$watch('fjze + sfbl', getDkze);

    //还款总额
    $scope.hkze = 0.00;
    //贷款月数
    $scope.dkys = 0;
    //支付利息
    $scope.zflx = 0.00;
    //月均还款
    $scope.yjhk = 0.00;

    //商业贷款折扣初始化
    if(!$scope.sydkzk){
      $scope.sydkzk = 1.00;
    }


    //watch组合贷款额度
    $scope.$watch('gjjdked + sydked + dkze', function(){
      $scope.dkze = Math.round($scope.fjze * (1 - $scope.sfbl/10)*100)/100;
      $scope.sydked = $scope.dkze - $scope.gjjdked;
    });

    $scope.$watch('sydked', function(){
      if($scope.sydked < 0){
        $scope.sydked = 0;
      }
      if($scope.sydked > $scope.dkze){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
        $scope.sydked = $scope.dkze;
      }else{
        $scope.gjjdked = $scope.dkze - $scope.sydked;
      }
    });

    $scope.$watch('gjjdked', function(){
      if($scope.gjjdked < 0){
        $scope.gjjdked = 0;
      }
      if($scope.gjjdked > $scope.dkze){
        var toastPopup = $ionicPopup.alert({
          cssClass:'toastPopup',
          template: '超出贷款总额'
        });
        $timeout(function() {
          toastPopup.close();
        }, 1000);
        $scope.gjjdked = $scope.dkze;
      }else{
        $scope.sydked = $scope.dkze - $scope.gjjdked;
      }
    });


    $scope.gjjJs = function(){
      var result = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.dkze,$scope.dknx,$scope.dkll);
      $scope.hkze = result.hkze;
      $scope.dkys = result.dkys;
      $scope.zflx = result.zflx;
      $scope.yjhk = result.yjhk;
    };


    $scope.sydkJs = function(){
      var result = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.dkze,$scope.dknx,$scope.dkll * $scope.sydkzk);
      $scope.hkze = result.hkze;
      $scope.dkys = result.dkys;
      $scope.zflx = result.zflx;
      $scope.yjhk = result.yjhk;
      $scope.hk = result.hk;
    };


    $scope.zhdkJs = function(){
      //console.log("还款方式：" + $scope.hkfs);
      //console.log("房价总额：" + $scope.fjze);
      //console.log("首付比例：" + $scope.sfbl);
      //console.log("贷款总额：" + $scope.dkze);
      //console.log("公积金贷款：" + $scope.gjjdked);
      //console.log("商业贷款：" + $scope.sydked);
      //console.log("贷款年限：" + $scope.dknx);
      //console.log("公积金利率：" + $scope.gjjDkllZh);
      //console.log("商业利率：" + $scope.syDkllZh);
      //console.log("商业利率折扣：" + $scope.sydkzk);
      //console.log("商业贷款利率说明：" + $scope.dkllName);

      var gjjResult = $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.gjjdked,$scope.dknx,$scope.gjjDkllZh);
      var SyResult =  $scope.js($scope.hkfs,$scope.fjze,$scope.sfbl,$scope.sydked,$scope.dknx,$scope.syDkllZh * $scope.sydkzk)

      $scope.hkze = Math.round((gjjResult.hkze + SyResult.hkze)*100)/100;
      $scope.dkys = gjjResult.dkys;
      $scope.zflx = Math.round((gjjResult.zflx + SyResult.zflx)*100)/100;
      $scope.yjhk = Math.round((gjjResult.yjhk + SyResult.yjhk)*100)/100;
      $scope.hk = SyResult.hk;

      //console.log(gjjResult);
      //console.log(SyResult);
      //
      //console.log("还款总额：");
      //console.log(gjjResult.hkze + SyResult.hkze);
      //
      //console.log("贷款月数：");
      //console.log(gjjResult.dkys);
      //
      //console.log("支付利息：");
      //console.log(gjjResult.zflx + SyResult.zflx);
      //
      //console.log("月均还款：");
      //console.log(gjjResult.yjhk + SyResult.yjhk);
      //
      //console.log("还款形式：");
      //console.log(SyResult.hk);

    };
})
