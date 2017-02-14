app.controller("wordsCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    ($scope, $rootScope, $http, $timeout) => {
        $scope.disabled = false;
        $scope.edit = {};
        let time = new Date();
        $scope.date_from = time;
        $scope.date_till = time;
        $scope.allWords = [];
        $scope.getWords = (from, till) => {
            let data = {from, till};
            $rootScope.httpRequest("getWords", "POST", data, (data) => {
                if (!data.error) {
                    $scope.allWords = data.message;
                } else {
                    $scope.allWords = [];
                    $scope.message = data.message;
                    $timeout(()=>{
                        $scope.message = null;
                    }, 2000)
                }
            })
        };
        $scope.deleteWord = (word) => {
            $rootScope.httpRequest("deleteWord", "POST", word, (data) => {
                if (!data.error) {
                    $scope.getWords($scope.date_from, $scope.date_till);
                    Materialize.toast('word deleted!', 1500);
                }
            });
        };
        $scope.openEditWindow = (word) => {
            $scope.edit = word;
            $('#edit').modal('open');
        };
        $scope.saveChanges = (edit) => {
            $rootScope.httpRequest("editWord", "POST", edit, (data) => {
                if (!data.error) {
                    Materialize.toast('word edited!', 1500);
                    $scope.getWords($scope.date_from, $scope.date_till);
                }
            });
        };
    }
]);

