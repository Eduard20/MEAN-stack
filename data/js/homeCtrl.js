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
        // Search

        $scope.enableSearch = function (word) {
            console.log(word);
            (undefined != word && word.length > 0) ? $scope.disableSearch = false : $scope.disableSearch = true;
        };
        $scope.searchWord = function (word) {
            var data = { word : word };
            $http({url : "/api/searchWord", method : "POST", data : data}).success( function (data) {
                if (!data.error) {
                    $scope.searchData = data.message.words;
                } else {
                    $scope.searchData = false;
                    $scope.word = "";
                    $scope.message = data.message;
                    $timeout(function () {
                        $scope.message = "";
                    }, 2000);
                    $scope.enableSearch($scope.word);
                }
            })
        };
        $scope.deleteFromSearch = function (word) {
            $scope.deleteWord(word);
            $scope.searchData = false;
            $scope.word = "";
            $scope.enableSearch($scope.word);
        };
    }
]);

