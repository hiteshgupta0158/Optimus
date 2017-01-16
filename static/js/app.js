'use strict';
var optimusApp = angular.module('optimus', ['ngRoute', 'ui.bootstrap']);

optimusApp.config(function ($routeProvider) {
    $routeProvider.when('/',{
        redirectTo: '/index'
    }).when('/index', {
		templateUrl : 'views/main.html',
		controller: 'WeatherCtrl'
	}).when('/aboutus', {
		templateUrl : 'views/about.html',
		controller: 'WeatherCtrl'
	}).when('/services', {
		templateUrl : 'views/main.html',
		controller: 'WeatherCtrl'
	}).otherwise({
	    redirectTo: '/index'
	});
});