app.controller("mainCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    function ($scope, $rootScope, $http, $timeout, $cookies) {
        $scope.isLogged = false;
        $scope.disableSearch = true;
        $scope.monthlyQuantity = 100;
        $scope.formData = [];
        $scope.allWords = [];
        $scope.userInfo = {};
        $rootScope.getUserInfo(function(data){
            (!data.error) ? $scope.isLogged = true : $scope.isLogged = false;
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
            $http({url : "/login", method : "POST", data : Data}).success(function(data){
                if (!data.error) {
                    var token = data.message.token;
                    $cookies.put('token', token);
                    $scope.isLogged = true;
                    $scope.userInfo = data.message;
                    console.log($scope.userInfo);
                } else {
                    $scope.message = data.message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.addWord = function(english, translation) {
            var Data = {
                english : english,
                translation : translation
            };
            $scope.formData = JSON.stringify(Data);
            $http({url : "/addWord", method : "POST", data : $scope.formData}).success(function() {
                $scope.english = '';
                $scope.translation = '';
                Materialize.toast('New word added!', 2000);
                $scope.refreshWords();
            })
        };
        $scope.refreshWords = function() {
            $http({url: "/getWords", method : "GET"}).success(function(data){
                angular.copy(data.data, $scope.allWords);
            });
        };
        $scope.refreshWords();
        $scope.deleteWord = function (word) {
            $http({url : "/deleteWord", method : "POST", data : word}).success(function(data){
                if (!data.error) {
                    Materialize.toast('word deleted!', 2000);
                    $scope.refreshWords();
                }
            });
        };
        $scope.deleteFromSearch = function (word) {
            $scope.deleteWord(word);
            $scope.searchData = false;
            $scope.word = "";
        };
        $scope.searchWord = function (word) {
            var data = { word : word };
            $http({url : "/searchWord", method : "POST", data : data}).success( function (data) {
                if (!data.error) {
                    $scope.searchData = data.message;
                } else {
                    $scope.word = "";
                    $scope.message = data.message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.enableSearch = function (word) {
            (word.length > 0) ? $scope.disableSearch = false : $scope.disableSearch = true;
        }
    }
]);

