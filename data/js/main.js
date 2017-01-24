app.controller("mainCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
     ($scope, $rootScope, $http, $timeout, $cookies) => {
        $rootScope.isLogged = false;
        $scope.formData = [];
        $rootScope.latestWords = [];
        $rootScope.userInfo = {};
        $scope.disableSearch = true;
        let getUserInfo = (token) => {
             if (token) {
                 $rootScope.getUserInfo((data) => {
                     if (!data.error) {
                         $rootScope.isLogged = true;
                         $rootScope.userInfo = data.message;
                     } else {
                         $rootScope.isLogged = false;
                     }
                 });
             }
         };
        let token = $cookies.get('token');
        getUserInfo(token);

        $scope.register = (username, password, language, translation) => {
            let Data = {
                username : username,
                password : password
            };
            if (language == 1) {
                Data.language = "EN"
            }
            if (translation == 1) {
                Data.translation = "RU"
            }
            $http({url : "/register", method : "POST", data : Data}).success( (data) => {
                if (!data.error) {
                    $scope.username = "";
                    $scope.password = "";
                    $scope.language = "";
                    $scope.translation = "";
                    $('#modal1').modal('open');
                } else {
                    $scope.message = data.message;
                    $timeout(() => {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.login = (username, password) => {
            let Data = {
                username : username,
                password : password
            };
            $http({url : "/login", method : "POST", data : Data}).success((data) =>{
                if (!data.error) {
                    let token = data.message.token;
                    $cookies.put('token', token);
                    $scope.isLogged = true;
                    $rootScope.allWords = data.message.words;
                } else {
                    $scope.message = data.message;
                    $timeout(() => {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.logout = () => {
            $cookies.remove('token');
            $rootScope.isLoggedIn = false;
            location.reload();
        };
     }
]);

