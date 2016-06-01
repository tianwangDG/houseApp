angular.module('concernController', [])


.controller('concernCtrl', function($scope, $ionicModal, $ionicHistory,$http, $window, $ionicPopup, $state,appInfo, AuthService) {

    var customer_id = AuthService.get_Customer_id();

    $scope.active_content = 'booked';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }

    //////////////////////// 预约 ///////////////////////
    $http.get(appInfo.apiUrl + '/reservation/?customer_id=' + customer_id)
      .success(function(response){
        $scope.reservationArr = response.data;
        //console.log($scope.reservationArr);
      })


    $scope.goToHouse = function(house_id){
      $state.go('tab.house',{id:house_id});
    }


    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    //开始对话
    $scope.startChat = function(receive_id){
      //记录开始对话的时间
      if(!sessionStorage.getItem("localTime")){
        sessionStorage.setItem("localTime",Date.now());
      }
      //var sender = "bin" //localStorage.getItem("customer_id");  //当前登陆用户，即发送消息者
      //var receive = "liubin"//receive_id;
      var sender = localStorage.getItem("customer_id");  //当前登陆用户，即发送消息者
      var receive = receive_id;


      $http.get("/dialogue.json").success(function(data){
        dialogue = false;
        angular.forEach(data,function(x,y){
          if(x.chatName == sender+"_"+receive){
            dialogue = "dialogue/" + x.chatName;
            return true;
          }else if (x.chatName == receive +"_"+sender) {
            dialogue = "dialogue/" + x.chatName;
            return true;
          }
          if(!dialogue){
            dialogue = false;
          }
        });
        //如果dialogue不为假，则可以开始对话;否则新创建对话室
        if(false!==dialogue){
          sessionStorage.setItem("dialogue",dialogue);
          $state.go("tab.message",{});
        }else{
          console.log("创建对话")
        }
      })

      if(!sender){
        //$state.go();
        /*if(lg=prompt("请先登陆！")){
         sessionStorage.setItem("senderId",lg);
         sender = lg;
         }*/
      }
    }



    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////






    //切换已关注
    $scope.toConcern = function(tabName){
      $scope.active_content = tabName;

      $http.get(appInfo.apiUrl + '/concern/?customer_id=' + customer_id)
        .success(function(response){
          $scope.bookLpArray = response.data;
        })
        .error(function(response){
          console.log(response);
        })
    }

    //切换已带看
    $scope.toWatched = function(tabName){
      $scope.active_content = tabName;

      $http.get(appInfo.apiUrl + '/reservation/watched/?customer_id=' + customer_id)
        .success(function(response){
          $scope.watchedArr = response.data;
        })
    }

    $scope.cancelBook = function(id){
        var confirmPopup = $ionicPopup.confirm({
          title: '',
          template: '<p style="text-align: center;">确定取消此次预约？</p>',
          scope: $scope,
          buttons:[
            {
              text:'取消',
              type:'button-positive'
            },
            {
              text:'确定',
              type:'button-default',
              onTap: function(e){
                  //console.log(id);
                  $http({
                    method:'POST',
                    url: appInfo.apiUrl + '/reservation/cancel',
                    data:{ reservation_id:id },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
                  })
                    .success(function(response){
                      //console.log(response);
                      $window.location.reload(true);
                    })
              }
            }
          ]
        });
    }


    //复看
    $scope.reWatch = function(cid,hid){
      var reWatchBox = $ionicPopup.confirm({
        title: '',
        template: '<p style="text-align: center;">是否确定复看此楼盘？</p>',
        scope: $scope,
        buttons:[
          {
            text:'取消',
            type:'button-positive'
          },
          {
            text:'确定',
            type:'button-default',
            onTap: function(e){
              //console.log(id);
              $http({
                method:'POST',
                url: appInfo.apiUrl + '/reservation/create',
                data:{ customer_id:cid, house_id: hid , reservation_status:2},
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
              })
                .success(function(response){
                  //console.log(response);
                  $window.location.reload(true);
                })
            }
          }
        ]
      });
    }




    $scope.pklp = [];
    $scope.pkBtn = false;

    $scope.getPKLP = function(gzlp){
      if(gzlp.isChecked){
        if($scope.pklp.length > 2){
          var lpCompare = $ionicPopup.alert({
            title: '',
            template: '<p style="text-align: center;">最多只能对比三个楼盘？</p>',
            buttons:[
              {text:'确定', type:'button-default'}
            ]
          });
          lpCompare.then(function(){
            gzlp.isChecked = false;
          })
        }else{
          $scope.pklp.push(gzlp.house_id);
        }

      }else{
        var index = $scope.pklp.indexOf(gzlp.id);
        $scope.pklp.splice(index,1);
      }


    }


    $scope.$watch('pklp.length', function(){
      if($scope.pklp.length > 1){
        $scope.pkBtn = true;
      }else{
        $scope.pkBtn = false;
      }

    });


    $scope.pk = function(){
      //console.log($scope.pklp);
      $state.go('pk',{param:$scope.pklp});
    }


})






  .controller('pkCtrl', function($scope,$ionicHistory,$stateParams, $ionicSlideBoxDelegate,$http, appInfo){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.active_content = 'fwhx';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }


    $scope.compareFields = [
      {id:1,field:"参考价格"},
      {id:2,field:"交楼状态"},
      {id:3,field:"最早交楼"},
      {id:4,field:"产权年限"},
      {id:5,field:"规划户数"},
      {id:6,field:"规划车位"},
      {id:7,field:"容积率"},
      {id:8,field:"绿化率"},
      {id:9,field:"水电燃气"},
      {id:10,field:"开发商"}
    ];

    $scope.comparePt = [
      {id:1,field:"距离中心"},
      {id:2,field:"距离轻轨"},
      {id:3,field:"距离学校"},
      {id:4,field:"距离医院"},
      {id:5,field:"距离市场"},
    ];

    //console.log($stateParams.param);
    var params = $stateParams.param.join(",");
    $http.get(appInfo.apiUrl + '/house/?house_id=' + params)
      .success(function(response){
        $scope.pklp = response.data;
        $scope.pklpArr = response.data;
      })


    $scope.removePklp = function($index){
      var index = $scope.pklpArr.indexOf($index);
      $scope.pklpArr.splice(index, 1);
    }



    //房屋户型PK
    $http.get(appInfo.apiUrl + '/house/apartment_pk?house_id=' + params )
      .success(function(response){
        //console.log(response.data);
        $scope.pkhxLpArr = response.data;
        //console.log($scope.pkhxLpArr.length);

        angular.forEach($scope.pkhxLpArr, function(lphxArr){
          //console.log(lphxArr.apartments);
          $scope.apartments = lphxArr.apartments;
          angular.forEach(lphxArr.apartments, function(v, k){
            //if(v.belongTo === lphxArr.house_id){
            //  $scope.pkhxItemArr.push(v);
            //  return false;
            //}
          });
        })

      })



    $scope.hxIndex = 0;

    $scope.slideHasChanged = function($index){
      console.log($index);
      $scope.hxIndex = $index;
    }

    $ionicSlideBoxDelegate.$getByHandle('a1').currentIndex();




    $scope.options = {
      loop: false,
      speed: 500,
      spaceBetween:20,
      slidesPerView:1,
      initialSlide:0,
      slidesPerColumn:1,
      slidesPerColumnFill:'column',
      centeredSlides:false,
      slidesOffsetBefore:0,
      slidesOffsetAfter:0,
      paginationHide:true,
      pagination:false,

      onInit: function(swiper){
        //console.log(swiper);
        //console.log(swiper.length);
      },

      onSlideChangeEnd: function(swiper){
        console.log('The active index is ' + ( swiper.activeIndex ));


        console.log(swiper);

        $scope.hxIndex = swiper.activeIndex;
        $scope.$apply();
        //$scope.onSlideHx(swiper.activeIndex);
      }
    }




















  })















