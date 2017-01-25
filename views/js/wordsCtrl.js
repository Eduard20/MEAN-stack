app.controller("wordsCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    ($scope, $rootScope, $http, $timeout) => {
        $scope.disabled = false;
        $scope.allWords = [];
        $scope.getWords = (from, till) => {
            let data = {from, till};
            $rootScope.httpRequest("getWords", "POST", data, (data) => {
                if (!data.error) {
                    $scope.allWords = data.message;
                } else {
                    $scope.message = data.message;
                    $timeout(()=>{
                        $scope.message = null;
                    }, 2000)
                }
            })
        }
    }
]);

