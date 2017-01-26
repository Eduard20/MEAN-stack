app.controller("mainCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
     ($scope, $rootScope, $http, $timeout, $cookies) => {
        $scope.reg_username = null;
        $scope.reg_password = null;
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

        $scope.register = (reg_username, reg_password, language, translation) => {
            let Data = {
                username : reg_username.toLowerCase(),
                password : reg_password
            };
            if (language == 1) {
                Data.language = "EN"
            }
            if (translation == 1) {
                Data.translation = "RU"
            }
            $http({url : "/register", method : "POST", data : Data}).success( (data) => {
                if (!data.error) {
                    $('#modal1').modal('open');
                    location.reload();
                } else {
                    $scope.message = data.message;
                    $timeout(() => {
                        $scope.message = "";
                    }, 2000)
                }
            })
        };
        $scope.clearFields = () => {
            $scope.reg_username = null;
            $scope.reg_password = null;
        };
        $scope.login = (username, password) => {
            let Data = {
                username : username.toLowerCase(),
                password : password
            };
            $http({url : "/login", method : "POST", data : Data}).success((data) =>{
                if (!data.error) {
                    let token = data.message.token;
                    $cookies.put('token', token);
                    $rootScope.allWords = data.message.words;
                    $rootScope.isLogged = true;
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
            $rootScope.isLogged = false;
        };
     }
]);

