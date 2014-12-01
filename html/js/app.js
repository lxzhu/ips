define(['angular','angularResource','app/controllers/mainController','app/services/mainService'],function(angular){
	return angular.module('webApp',['angularResource','controllers','services','ui.router','ngCookies','ngRoute','ngAnimate'])
})