'use strict';
var zoombeiApp = angular.module('zoombei', ['ngRoute']);

zoombeiApp.config(function($routeProvider) {	
	
	$routeProvider.when('/index', {
		templateUrl : 'views/main.html',
		controller : 'mainCtrl'		
	}).when('/aboutus', {
		templateUrl : 'views/about.html',
		controller : 'mainCtrl'		
	}).when('/services', {
		templateUrl : 'views/main.html',
		controller : 'mainCtrl'		
	});
});