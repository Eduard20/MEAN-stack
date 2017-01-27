app.controller("profileCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$routeParams', '$location',
    ($scope, $rootScope, $http, $timeout, $routeParams, $location) => {
        if ($routeParams.id === $rootScope.userInfo.userId) {
            $location.path("/");
        } else {
            $scope.showUser = false;
            $scope.userData = [];
            let getUserInfo = () => {
                let Data = {data : $routeParams.id};
                $rootScope.httpRequest("getProfileInfo", "POST", Data, (data) => {
                    if (!data.error) {
                        $scope.userData = data.message;
                        $scope.showUser = true;
                    } else {
                        $location.path("/");
                        $scope.userMessage = data.message;
                    }
                })
            };
            getUserInfo();


            $scope.addWord = (word) => {
                let data = {
                    word : word.word,
                    translation : word.translation,
                    word_type : $rootScope.userInfo.language,
                    trans_type : $rootScope.userInfo.translation
                };
                $rootScope.httpRequest("addWord", "POST", data, (data) => {
                    if (!data.error) {
                        Materialize.toast('New word added!', 1500);
                    }
                });
            };
        }
    }
]);

