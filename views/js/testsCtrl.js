app.controller("testsCtrl", ['$scope', '$rootScope', '$http', '$timeout',
    ($scope, $rootScope, $http, $timeout) => {
    $scope.test = {};
    $scope.showCategories = true;
        $scope.selectOption = (opt) => {
            if (opt === "light") {
                $scope.test.title = opt;
                $scope.showCategories = false;
            } else if (opt === "super") {
                $scope.test.title = opt;
                $scope.showCategories = false;
            }
        };
    }
]);

