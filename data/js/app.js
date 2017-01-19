var app = angular.module('wordsApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
        // $routeProvider
            // .when("/", {
            //     templateUrl: '/index.html',
            //     controller: 'mai'
            // })
            // .otherwise({ redirectTo: '/' });

        $httpProvider.interceptors.push(['$q', '$location', '$cookies', '$rootScope', function($q, $location, $cookies, $rootScope) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    config.timeout = 15000;
                    var token = $cookies.get('token');
                    if (token) {
                        config.headers.Authorization = token;
                    }
                    return config;
                },
                'responseError': function(response) {
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
    function($rootScope, $timeout, $http,$cookies) {
        $rootScope.httpRequest = function(path, method, obj, callback) {
            return $http({
                url: '/api/' + path,
                method: method,
                data: obj
            }).success(callback).error(callback);
        };
        $rootScope.getUserInfo = function(callback) {
            var token = $cookies.get('token');
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
