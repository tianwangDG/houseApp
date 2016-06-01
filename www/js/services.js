angular.module('starter.services', ['ngResource'])

	.factory('Slider',function($resource, appInfo){
		return $resource(appInfo.apiUrl + '/house/slider', {},{

		});
	})

	.factory('House', function($resource, appInfo){
		return $resource(appInfo.apiUrl + '/house/?page=:page', {filter:"@filter",page:"@page"},{

		});
	})

	.factory('HouseDetail', function($resource, appInfo){
		return $resource(appInfo.apiUrl + '/house/show?house_id=:id', {id:"@id"},{

		});
	})


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////




  .service('AuthService', function($q, $http, USER, appInfo) {
    var LOCAL_TOKEN_KEY = 'customer_id';
    var customer_id = null;
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      customer_id = token;
      isAuthenticated = true;
      authToken = token;

      //var c_id = USER.customer_id;

      // 必要时设置请求头
      //$http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      // username = '';
      customer_id = null;
      isAuthenticated = false;
      //$http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    //var loginO = function(name, pw) {
    //  return $q(function(resolve, reject) {
    //    if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
    //      // 从服务器请求认证信息
    //      customer_id = 999;
    //      storeUserCredentials(customer_id);
    //      resolve('Login success.');
    //    } else {
    //      reject('Login Failed.');
    //    }
    //  });
    //};

    var login = function(phone, code, openid){
      console.log(phone);
      console.log(code);
      console.log(openid);
      return $q(function(resolve, reject) {
        var customer_openid = '1234dd56789';
        $http({
          method:'POST',
          url: appInfo.customerApi + '/login',
          data:{customer_openid:openid,customer_telephone:phone, customer_code: code},
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
        })
          .success(function(response){
            console.log(response);
            customer_id = response.data.customer_id;
            console.log(customer_id);
            storeUserCredentials(customer_id);
            resolve('登录注册成功');
          })
          .error(function(response){
            //console.log(response);
            reject('登录注册失败');
          });
      });
    };







    var logout = function() {
      destroyUserCredentials();
    };

    var isAuthorized = function(customer_id) {
      if (angular.isNumber(customer_id) && customer_id !== 0) {
        customer_id = customer_id;
        return false;
      }else{
        return true;
      }
    };

    loadUserCredentials();

    return {
      login: login,
      logout: logout,
      isAuthorized: isAuthorized,
      isAuthenticated: function() {return isAuthenticated;},
      get_Customer_id: function() {return customer_id;}
    };
  });













