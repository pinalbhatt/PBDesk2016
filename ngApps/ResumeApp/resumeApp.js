
(function () {
    'use strict';

    angular
        .module('PBDesk.ResumeApp', ['ngCookies', 'ngSanitize', 'ngRoute', 'ngAnimate'])
        .config(configRoutes)
        .factory('APIService', APIService)
        .controller('homeController', homeController)
        .controller('accessController', accessController)
        .controller('requestController', requestController)
        .controller('R1Controller', R1Controller)
        .controller('R2Controller', R2Controller)
        .controller('R3Controller', R3Controller)
        .controller('R4Controller', R4Controller);


    var activateCookieName = "cvAct";
    var accessCodeCookieName = "cvAC";

    configRoutes.$inject = ['$routeProvider'];
    APIService.$inject = ['$http', '$q'];
    homeController.$inject = ['$scope', '$rootScope', '$cookies', '$location', 'APIService'];
    accessController.$inject = ['$scope', '$rootScope', '$cookies','$location', '$q', 'APIService'];
    requestController.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];
    R1Controller.$inject = ['$scope', '$rootScope', '$cookies', '$q', '$location', 'APIService'];
    R2Controller.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];
    R3Controller.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];
    R4Controller.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];


    function configRoutes($routeProvider) {

        var appPath = "/ngApps/ResumeApp/";
        var viewPath = appPath + "views/"
        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl : viewPath +  'index.html',
                controller  : 'homeController',
                controllerAs: 'vm'
            })

            .when('/Access', {
                templateUrl : viewPath +  'Access.html',
                controller  : 'accessController',
                controllerAs: 'vm'
            })

            // route for the about page
            .when('/Request', {
                templateUrl : viewPath +  'Request.html',
                controller  : 'requestController',
                controllerAs: 'vm'
            })

            .when('/R1', {
                templateUrl : viewPath +  'R1.html',
                controller  : 'R1Controller',
                controllerAs: 'vm'
            })
            .when('/R2', {
                templateUrl : viewPath +  'R2.html',
                controller  : 'R2Controller',
                controllerAs: 'vm'
            })
            .when('/R3', {
                templateUrl : viewPath +  'R3.html',
                controller  : 'R3Controller',
                controllerAs: 'vm'
            })
            .when('/R4', {
                templateUrl : viewPath +  'R4.html',
                controller  : 'R4Controller',
                controllerAs: 'vm'
            })


            .otherwise( { redirectTo: '/' } );


    }

    function APIService($http, $q){

        //var baseUrl = "http://rsvc.pbdesk.io/RSvc/";
        var baseUrl = "http://localhost:3100/RSvc/";

        var service = {
            get: get,
            post: post
        };

        return service;



        function _makeHttpCall(options){
            /*options = {
             method: "",
             data: "",
             url: ""
             }*/
            var deferred = $q.defer();
            var apiUrl = baseUrl +  options.url;

            var req = {
                method: options.method,
                url: apiUrl,
                headers: {
                    "Content-Type": "application/json"
                }
            }
            if(options.data !== undefined){
                req.data = options.data;
            }

            $http(req)
                .then(function(response){
                        deferred.resolve(response);
                    },
                    function(error){
                        deferred.reject(error);
                    });
            return deferred.promise;
        }

        function get(partialUrl){

            var options = {
                method: "GET",
                url: partialUrl
            }
            var deferred = $q.defer();
            _makeHttpCall(options)
                .then(function(response){
                        if (response.status === 200) {
                            deferred.resolve(response);
                        }
                        else{
                            deferred.reject(response);
                        }
                    },
                    function(error){
                        deferred.reject(error);
                    });
            return deferred.promise;
        }

        function post(partialUrl, data){

            var options = {
                method: "POST",
                url: partialUrl,
                data: data
            }
            var deferred = $q.defer();
            _makeHttpCall(options)
                .then(function(response){
                        if (response.status === 200) {
                            deferred.resolve(response);
                        }
                        else{
                            deferred.reject(response);
                        }
                    },
                    function(error){
                        deferred.reject(error);
                    });
            return deferred.promise;
        }
    }

    function homeController($scope, $rootScope, $cookies, $location, APIService) {
        activateRSvc($cookies, APIService);
        var access = checkForAccess($cookies);
        if(access === true){
            $location.path('R1');
        }
        else{
            $location.path('Access');
        }
    }

    function accessController($scope, $rootScope, $cookies, $location, $q, APIService) {
        $scope.data = {accessCode: "" };

        $scope.verifyAccessCode = function(){

            verifyAccessCode($scope.data.accessCode, $rootScope, $cookies, $q, APIService)
                .then(function(success){
                    $rootScope.cvData = success;
                    $location.path("R1");
                }, function(error){

                });
        }

    }
    function requestController($scope, $rootScope, $cookies, APIService) {

    }
    function R1Controller($scope, $rootScope, $cookies, $q, $location, APIService) {
        if($rootScope.cvData){
            $scope.cvData = $rootScope.cvData;
        }
        else {
            var code = getAccessCode($cookies);
            verifyAccessCode(code, $rootScope, $cookies, $q, APIService)
                .then(function(success){
                    $rootScope.cvData = success;
                    $scope.cvData = $rootScope.cvData;
                }, function(error){
                    $location.path("Access");
                });


        }

    }
    function R2Controller($scope, $rootScope, $cookies, APIService) {
        if($rootScope.cvData){
            $scope.cvData = $rootScope.cvData;
        }
        else {
            var code = getAccessCode($cookies);
            verifyAccessCode(code, $rootScope, $cookies, $q, APIService)
                .then(function(success){
                    $rootScope.cvData = success;
                    $scope.cvData = $rootScope.cvData;
                }, function(error){
                    $location.path("Access");
                });


        }
    }
    function R3Controller($scope, $rootScope, $cookies, APIService) {
        if($rootScope.cvData){
            $scope.cvData = $rootScope.cvData;
        }
        else {
            var code = getAccessCode($cookies);
            verifyAccessCode(code, $rootScope, $cookies, $q, APIService)
                .then(function(success){
                    $rootScope.cvData = success;
                    $scope.cvData = $rootScope.cvData;
                }, function(error){
                    $location.path("Access");
                });


        }
    }
    function R4Controller($scope, $rootScope, $cookies, APIService) {
        if($rootScope.cvData){
            $scope.cvData = $rootScope.cvData;
        }
        else {
            var code = getAccessCode($cookies);
            verifyAccessCode(code, $rootScope, $cookies, $q, APIService)
                .then(function(success){
                    $rootScope.cvData = success;
                    $scope.cvData = $rootScope.cvData;
                }, function(error){
                    $location.path("Access");
                });


        }
    }


    function checkForAccess($cookies){
        var cvAC = $cookies.get(accessCodeCookieName);
        if(cvAC){
            return true;
        }
        else{
            return false;
        }

    }

    function activateRSvc($cookies, APIService){
        var cvAct = $cookies.get(activateCookieName);
        if(cvAct === undefined) {
            var d = new Date();
            d.setMinutes(d.getMinutes() + 15);
            APIService.get("Activate").then(function (data) {
                console.log(data);
                $cookies.put(activateCookieName, "1", {'expires': d});
            }, function (error) {
                console.log(error);
                $cookies.put(activateCookieName, "0", {'expires': d});
            });
        }
    }

    function  writeAccessCode(code, $cookies){
        if(code && code.toString().trim().length !== 0){
            var d = new Date();
            d.setMinutes(d.getMinutes() + 30);
            $cookies.put(accessCodeCookieName, code, {'expires': d});
        }
    }
    function getAccessCode($cookies){
        var result;
        var code = $cookies.get(accessCodeCookieName);
        if(code && code.toString().trim().length !== 0){
            result = code;
        }
        return result;
    }
    function verifyAccessCode(code, $rootScope, $cookies, $q, APIService){

        var deferred = $q.defer();
        if(code !== undefined){
            if(code.toString().trim().length === 0 ){
                deferred.reject("Access code is blank");
            }
            else {

                APIService.get("Access?a=" + code).then(function (success) {
                    console.log(success);
                    if (success && success.data) {
                        $rootScope.cvData = success.data;
                        writeAccessCode(code, $cookies);
                        deferred.resolve(success.data);
                    }

                }, function (error) {
                    deferred.reject(error);
                });
            }
        }
        else {
            deferred.reject("Access Code Undefined");
        }
        return deferred.promise;
    }

    })();