app.controller("homeCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    function ($scope, $rootScope, $http, $timeout) {
        $scope.english = "";
        $scope.translation = "";
        $scope.monthlyQuantity = 100;
        $scope.formData = [];
        $scope.addWord = function (english, translation) {
            var Data = {
                english : english,
                translation : translation
            };
            $scope.formData = JSON.stringify(Data);
            $http({url : "/api/add", method : "POST", data : $scope.formData}).success(function(data) {
                $rootScope.allWords = data.message.words;
                $scope.english = '';
                $scope.translation = '';
                Materialize.toast('New word added!', 2000);
                // $scope.refreshWords();
                console.log(data);
            })
        };
        $scope.refreshWords = function() {
            $http({url: "/api/getWord", method : "GET"}).success(function(data){
                angular.copy(data.message, $rootScope.allWords);
            });
        };
        // $scope.refreshWords();
        $scope.deleteWord = function (word) {
            $http({url : "/api/delete", method : "POST", data : word}).success(function(data){
                if (!data.error) {
                    Materialize.toast('word deleted!', 2000);
                    $scope.refreshWords();
                }
            });
        };

    }
]);

