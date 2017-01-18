var app = angular.module("mainModule", []);

app.controller("mainCtrl", ['$scope', '$rootScope', '$http',
    function ($scope, $rootScope, $http) {
        $scope.monthlyQuantity = 100;
        $scope.formData = [];
        $scope.allWords = [];
        $scope.addWord = function(english, translation) {
            var Data = {
                english : english,
                translation : translation
            };
            $scope.formData = JSON.stringify(Data);
            $http({url : "/addWord", method : "POST", data : $scope.formData}).success(function() {
                $scope.english = '';
                $scope.translation = '';
                Materialize.toast('New word added!', 1000);
                $scope.refreshWords();
            })
        };
        $scope.refreshWords = function() {
            $http({url: "/getAllWords", method : "GET"}).success(function(data){
                angular.copy(data.data, $scope.allWords);
            });
        };
        $scope.refreshWords();
        $scope.deleteWord = function (word) {
            $http({url : "/deleteWord", method : "POST", data : word}).success(function(data){
                if (!data.error) {
                    Materialize.toast('word is deleted!', 1000);
                    $scope.refreshWords();
                }
            });
        }
    }
]);

