angular.module('starter.services', ['ngResource'])

	.factory('Slider',function($resource, appInfo){
		return $resource(appInfo.apiUrl + '/house/slider', {},{

		});
	})

	.factory('House', function($resource, appInfo){
		return $resource(appInfo.apiUrl + '/house/?page=:page', {page:"@page"},{

		});
	})



