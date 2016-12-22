"use strict";var app=angular.module("PomodoroTimer",["ui.router"]);app.config(["$locationProvider",function(e){e.html5Mode(!0)}]),app.controller("TimerCtrl",["$scope",function(e){e.timerMessage="Timer Message"}]),app.config(["$stateProvider",function(e){e.state("timer",{url:"/timer",templateUrl:"js/timer/timer.template.html",controller:"TimerCtrl"})}]);
//# sourceMappingURL=main.js.map
