angular.module('messageController', [])


.controller('messageCtrl', function($state,$location,$scope,$rootScope,$http,$filter) {
    var sender = localStorage.getItem("customer_id");
    var dialogue = sessionStorage.getItem("dialogue") ;
    if(!dialogue) $state.go("tab.index");

    console.log(sender)
    console.log(dialogue)
    //$http.get('http://app.tigonetwork.com/api/customer/getMemberInfo?customer_id=' + c_id)
    //提交按钮事件
    $scope.send = function(){

      var aref = new Wilddog("https://qiyoon.wilddogio.com/" + dialogue);   //创建聊天室
      var val=$scope.content;

      var sarr = [];
      sarr[sender] = {"value":val,"username":sender,"time":Date.now()};
      aref.push(sarr);
      $scope.content = "";
    }

    //对话内容
    var ref = new Wilddog("https://qiyoon.wilddogio.com/"+dialogue);
    ref.on('value',loadData);
    function loadData(pshot) {
      var newarr = [];
      var data,fasong = "",jieshou="";
      pshot.forEach(function(snap){
        data = snap.val();
        for(var n in data){
          if(sessionStorage.getItem("localTime")>data[n].time)
            continue;
          if(n==sender){
            data[n].type = 1;data[n].textAlign = "text-align:right" ;
          }
          else{
            data[n].type = 0
          }
          //格式化时间戳
          /*var d = Math.ceil((Date.now() - data[n].time)/1000);
           if( d/60 <= 60){
           data[n].showtime = Math.ceil(d/60)+"分钟前"
           }else if(d/60 > 60 && d/60 < 24*60){
           data[n].showtime = Math.ceil(d/3600)+"小时前"
           }else if(d/60 > 24*60) {
           data[n].showtime = Math.ceil(d/(3600*24))+"天前"
           }*/
          newarr.push(data[n]);
        }
      });
      $scope.message = newarr;
      var html="";
      angular.forEach(newarr,function(v,k){
        if(v.type == 1) v.username=""
        else v.username=v.username+"：";
        html+='<li style="'+v.textAlign+'">'+v.username+v.value+'&nbsp;&nbsp;'+"<p>"+$filter("date")(v.time,"yyyy-MM-dd HH:mm:ss")+'</p></li>'
      })
      document.getElementById("message").innerHTML = html;
    }
});
