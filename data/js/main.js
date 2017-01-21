app.controller("mainCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    function ($scope, $rootScope, $http, $timeout, $cookies) {
        $rootScope.isLogged = false;
        $scope.formData = [];
        $rootScope.allWords = [];
        $rootScope.userInfo = {};
        $scope.disableSearch = true;
        $rootScope.getUserInfo(function (data) {
            console.log(data);
            if (!data.error) {
                $rootScope.isLogged = true;
                $rootScope.userInfo = data.message;
                $rootScope.allWords = data.message.words;
            } else {
                $rootScope.isLogged = false;
            }
        });
        $scope.register = function (username, password, language) {
            var Data = {
                username : username,
                password : password
            };
            if (language == 1) {
                Data.language = "English"
            }
            $http({url : "/register", method : "POST", data : Data}).success(function (data){
                if (!data.error) {
                    $scope.username = "";
                    $scope.password = "";
                    $scope.language = "";
                    $('#modal1').modal('open');
                } else {
                    $scope.message = data.message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.login = function (username, password) {
            var Data = {
                username : username,
                password : password
            };
            $http({url : "/login", method : "POST", data : Data}).success(function (data){
                if (!data.error) {
                    console.log(data);
                    var token = data.message.token;
                    $cookies.put('token', token);
                    $scope.isLogged = true;
                    $rootScope.allWords = data.message.words;
                } else {
                    $scope.message = data.message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.logout = function () {
            $cookies.remove('token');
            $rootScope.isLoggedIn = false;
            location.reload();
        };

    }
]);

