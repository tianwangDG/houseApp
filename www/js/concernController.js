angular.module('concernController', [])


.controller('concernCtrl', function($scope, $ionicModal, $ionicHistory,$http,  $ionicPopup, $state,appInfo) {
    var customer_id = 1;

    $scope.active_content = 'booked';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }

    $scope.jdr = {
      name:'胡景欢',
      phone:'18603045126'
    };

    $http.get(appInfo.apiUrl + '/concern/?customer_id=' + customer_id)
      .success(function(response){
        console.log(response);
        $scope.bookLpArray = response.data;
      })
      .error(function(response){
        console.log(response);
      })


    //$scope.bookLpArray = [
    //  {id:1,name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:2,name:'东莞人家',zt:'简装',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:3,name:'来座山',zt:'简装',qy:'东城区',zj:2200000,fx:'一房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:4,name:'御湾国际',zt:'简装',qy:'南城区',zj:2700000,fx:'一房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:5,name:'东城中心',zt:'毛坯',qy:'东城区',zj:1900000,fx:'五房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:6,name:'帝景花园',zt:'清水',qy:'南城区',zj:2800000,fx:'一房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:7,name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:8,name:'万江首府',zt:'精装',qy:'万江区',zj:400000,fx:'四房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:9,name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:10,name:'万佳花园',zt:'毛坯',qy:'南城区',zj:500000,fx:'四房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:11,name:'水岸华庭',zt:'毛坯',qy:'厚街区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:12,name:'常平首府',zt:'豪装',qy:'厚街区',zj:700000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:13,name:'都市华府',zt:'清水',qy:'南城区',zj:1800000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:14,name:'东方华府',zt:'清水',qy:'东城区',zj:2300000,fx:'五房',thumbnail:'img/lp/lp1.jpg',isChecked:false},
    //  {id:15,name:'皇庭国际',zt:'豪装',qy:'万江区',zj:1300000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false},
    //  {id:16,name:'碧湖东岸',zt:'豪装',qy:'市辖区',zj:1000000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false}
    //];




    //$scope.bookLpName = $scope.bookLpArray[0].name;



    //日期选择
    function getLocalTime(nS) {
      return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
    //alert(getLocalTime(1177824835));

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.selectedDate = val;
        console.log(getLocalTime($scope.selectedDate));
      },
      from: new Date(2016, 1, 1), //Optional
      to: new Date(2030, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };



    $scope.cancelBook = function(){
      var cancelBook = $ionicPopup.confirm({
        title: '',
        template: '<p style="text-align: center;">确定取消此次预约？</p>',
        buttons:[
          {text:'取消', type:'button-positive'},
          {text:'确定', type:'button-default'}
        ]
      });

      cancelBook.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

    $scope.pklp = [];
    $scope.pkBtn = false;

    $scope.getPKLP = function(gzlp){
      //console.log(gzlp.isChecked);
      //console.log(gzlp.id);
      //console.log(gzlp.name);

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
          $scope.pklp.push(gzlp.id);
        }

      }else{
        var index = $scope.pklp.indexOf(gzlp.id);
        $scope.pklp.splice(index,1);
      }

      //console.log($scope.pklp);

    }

    $scope.$watch('pklp.length', function(){
      if($scope.pklp.length > 1){
        $scope.pkBtn = true;
      }else{
        $scope.pkBtn = false;
      }
    });


    $scope.pk = function(pklp){
      $state.go('pk',{param:pklp});
    }



})



  .controller('pkCtrl', function($scope,$ionicHistory,$stateParams, $ionicSlideBoxDelegate){
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.active_content = 'fwhx';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }



    //console.log($stateParams.param);

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

    $scope.pklp = [
      {id:1,k:'a',name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7000元',jzjl:'2016年9月',cqnx:'70年',ghhs:'1500',ghcw:'1200',rjl:'5.32',lhl:'30%',sdrq:'民水民电',develop:'正德集团',jlzx:'0.8km',jlqg:'3km','jlxx':'0.6km',jlyy:'2.0km',jlsc:'0.4km'},
      {id:2,k:'b',name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'},
      {id:3,k:'c',name:'北大一号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7000元',jzjl:'2016年9月',cqnx:'70年',ghhs:'1500',ghcw:'1200',rjl:'5.32',lhl:'30%',sdrq:'民水民电',develop:'正德集团',jlzx:'0.8km',jlqg:'3km','jlxx':'0.6km',jlyy:'2.0km',jlsc:'0.4km'},
      {id:4,k:'d',name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'},
      {id:5,k:'e',name:'皇庭壹号',zt:'毛坯',qy:'东城区',zj:500000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7000元',jzjl:'2016年9月',cqnx:'70年',ghhs:'1500',ghcw:'1200',rjl:'5.32',lhl:'30%',sdrq:'民水民电',develop:'正德集团',jlzx:'0.8km',jlqg:'3km','jlxx':'0.6km',jlyy:'2.0km',jlsc:'0.4km'},
      {id:6,k:'f',name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'},
      {id:7,k:'g',name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false,lpPrice:'6000元',jzjl:'2015年8月',cqnx:'50年',ghhs:'2500',ghcw:'2200',rjl:'5.32',lhl:'35%',sdrq:'商业用途',develop:'富盈集团',jlzx:'0.9km',jlqg:'3.2km','jlxx':'1.2km',jlyy:'2.2km',jlsc:'1.4km'},
      {id:8,k:'h',name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'},
      {id:9,k:'i',name:'北大一号',zt:'精装',qy:'万江区',zj:1550000,fx:'两房',thumbnail:'img/lp/lp2.jpg',isChecked:false,lpPrice:'6000元',jzjl:'2015年8月',cqnx:'50年',ghhs:'2500',ghcw:'2200',rjl:'5.32',lhl:'35%',sdrq:'商业用途',develop:'富盈集团',jlzx:'0.9km',jlqg:'3.2km','jlxx':'1.2km',jlyy:'2.2km',jlsc:'1.4km'},
      {id:10,k:'j',name:'帝景国际',zt:'毛坯',qy:'万江区',zj:1080000,fx:'三房',thumbnail:'img/lp/lp1.jpg',isChecked:false,lpPrice:'7800元',jzjl:'2016年1月',cqnx:'60年',ghhs:'1800',ghcw:'1000',rjl:'5.32',lhl:'40%',sdrq:'民水民电',develop:'万科地产',jlzx:'0.6km',jlqg:'2.3km','jlxx':'0.5km',jlyy:'2.3km',jlsc:'4.4km'}
    ];


    $scope.hxxx = [
      {id:1,belongTo:5,img:'img/house/hxt/hxt1.png',name:'户型A:4室2厅2卫',price:'700万',label:'大户型+朝南+低价',ldId:1,title:'户型A',ldName:'57栋',dy:'3单元',cs:'25层',mj:'246平米'},
      {id:2,belongTo:1,img:'img/house/hxt/hxt2.png',name:'户型B:3室2厅2卫',price:'580万',label:'小户型+朝东+高性价比',ldId:3,title:'户型B',ldName:'5栋',dy:'2单元',cs:'20层',mj:'156平米'},
      {id:3,belongTo:7,img:'img/house/hxt/hxt3.png',name:'户型C:4室2厅2卫',price:'705万',label:'中户型+朝东+低价',ldId:2,title:'户型C',ldName:'7栋',dy:'1单元',cs:'15层',mj:'237平米'},
      {id:4,belongTo:7,img:'img/house/hxt/hxt1.png',name:'户型D:3室2厅2卫',price:'608万',label:'大户型+朝南+低价',ldId:1,title:'户型D',ldName:'9栋',dy:'1单元',cs:'28层',mj:'323平米'},
      {id:5,belongTo:6,img:'img/house/hxt/hxt2.png',name:'户型E:5室3厅2卫',price:'1408万',label:'小户型+朝北+低价',ldId:1,title:'户型E',ldName:'10栋',dy:'3单元',cs:'22层',mj:'113平米'},
      {id:6,belongTo:4,img:'img/house/hxt/hxt3.png',name:'户型F:4室2厅2卫',price:'300万',label:'中户型+朝南+高性价比',ldId:2,title:'户型F',ldName:'8栋',dy:'2单元',cs:'21层',mj:'132平米'},
      {id:7,belongTo:6,img:'img/house/hxt/hxt1.png',name:'户型G:3室1厅1卫',price:'160万',label:'大户型+朝东+低价',ldId:3,title:'户型G',ldName:'4栋',dy:'2单元',cs:'20层',mj:'136平米'},
      {id:8,belongTo:4,img:'img/house/hxt/hxt2.png',name:'户型H:3室1厅2卫',price:'600万',label:'小户型+朝南+高性价比',ldId:3,title:'户型H',ldName:'2栋',dy:'1单元',cs:'19层',mj:'205平米'},
      {id:9,belongTo:6,img:'img/house/hxt/hxt3.png',name:'户型I:3室2厅2卫',price:'500万',label:'中户型+朝东+高性价比',ldId:2,title:'户型I',ldName:'3栋',dy:'3单元',cs:'21层',mj:'116平米'}
    ];

    $scope.pkhxItemArr = [];
    $scope.pkhxLpArr = [];
    $scope.pkhxAll = [];
    $scope.slider = [];
    angular.forEach($stateParams.param, function(value){
      //console.log(value);
      //$scope.slider.push('slider'+value);
      angular.forEach($scope.pklp, function(lpValue){
        if(lpValue.id == value){
          $scope.pkhxLpArr.push(lpValue);
        }
      });
    });

    console.log($scope.pkhxLpArr);


    angular.forEach($scope.pkhxLpArr, function(lpV){
      console.log(lpV);
      angular.forEach($scope.hxxx, function(v, k){
        if(v.belongTo === lpV.id){
          $scope.pkhxItemArr.push(v);
          return false;
        }
      });
    })


    //angular.forEach($scope.pkhxLpArr, function(vv,kk){
    //    $scope.lpHxArr = [];
    //    vv.allHx = [];
    //    angular.forEach($scope.pkhxItemArr, function(vvv){
    //        if(vvv.belongTo === vv.id){
    //            vv.allHx.push(vvv);
    //        }
    //    })
    //});

    $scope.hxIndex = 0;



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

    $scope.func = function(){
      console.log('dddd');
    }



  })















