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

