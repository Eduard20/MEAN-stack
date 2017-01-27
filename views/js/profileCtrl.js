app.controller("profileCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$routeParams', '$location',
    ($scope, $rootScope, $http, $timeout, $routeParams, $location) => {
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

    }
]);

