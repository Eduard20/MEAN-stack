app.controller("wordsCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    ($scope, $rootScope, $http, $timeout) => {
        $scope.disabled = false;
        $scope.getWords = (from, till) => {
            console.log(from);
            console.log(till);
        }
    }
]);

