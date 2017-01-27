const app = angular.module('wordsApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    ($routeProvider, $locationProvider, $httpProvider) => {
        if(!isMobile) {
            $routeProvider
                .when("/", {
                    templateUrl: '../html/main.html',
                    controller: 'homeCtrl'
                })
                .when("/id:id", {
                    templateUrl: '../html/profile.html',
                    controller: 'profileCtrl'
                })
                .when("/wall", {
                    templateUrl: '../html/wall.html',
                    controller: 'wordsCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        } else {
            $routeProvider
                .when("/", {
                    templateUrl: '../html/mobile/main.html',
                    controller: 'homeCtrl'
                })
                .when("/wall", {
                    templateUrl: '../html/mobile/wall.html',
                    controller: 'wordsCtrl'
                })
                .when("/id:id", {
                    templateUrl: '../html/mobile/profile.html',
                    controller: 'profileCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }

        $httpProvider.interceptors.push(['$q', '$location', '$cookies', '$rootScope', ($q, $location, $cookies, $rootScope) => {
            return {
                'request': (config) => {
                    config.headers = config.headers || {};
                    config.timeout = 15000;
                    let token = $cookies.get('token');
                    if (token) {
                        config.headers.Authorization = token;
                    }
                    return config;
                },
                'responseError': (response) => {
                    switch (response.status) {
                        case 401:
                        case 403:
                            $rootScope.isLoggedIn = false;
                            $cookies.remove('token');
                            break;
                        case 408 :
                        case -1 :
                            break;
                    }
                    return $q.reject(response);
                }
            };
        }]);
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

app.run(['$rootScope', '$timeout', '$http','$cookies',
    ($rootScope, $timeout, $http, $cookies) => {
        $rootScope.$on("$routeChangeStart", function () {
            if(!$cookies.get('token')){
                $rootScope.isLogged = false;
            }
        });
        $rootScope.httpRequest = (path, method, obj, callback) => {
            return $http({
                url: '/api/' + path,
                method: method,
                data: obj
            }).success(callback).error(callback);
        };
        $rootScope.getUserInfo = (callback) => {
            let token = $cookies.get('token');
            $http({
                method: 'POST',
                timeout: 15000,
                url: '/api/userInfo',
                headers:  {
                    'Authorization': token
                }
            }).success(callback);
        };
    }
]);
