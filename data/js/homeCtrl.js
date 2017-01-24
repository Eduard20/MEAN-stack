app.controller("homeCtrl", ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
    ($scope, $rootScope, $http, $timeout) => {
        $scope.formData = [];
        $scope.showWords = false;
        $scope.addWord = (word, translation) => {
            let data = {
                word : word,
                translation : translation,
                word_type : $rootScope.userInfo.language,
                trans_type : $rootScope.userInfo.translation
            };
            $rootScope.httpRequest("addWord", "POST", data, (data) => {
                if (!data.error) {
                    $scope.refreshWords();
                    $scope.word = null;
                    $scope.translation = null;
                    Materialize.toast('New word added!', 1500);
                }
            });
        };

        // get latest words

        $scope.refreshWords = () => {
            $rootScope.httpRequest("getLatestWords", "GET", {}, (data) => {
                $rootScope.latestWords = data.message;
                $scope.showWords = true;
            });
        };
        $scope.refreshWords();

        // delete word

        $scope.deleteWord = (word) => {
            $rootScope.httpRequest("deleteWord", "POST", word, (data) => {
                if (!data.error) {
                    $scope.refreshWords();
                    Materialize.toast('word deleted!', 1500);
                }
            });
        };

        // Search

        $scope.enableSearch = (word) => {
            (undefined != word && word.length > 0) ? $scope.disableSearch = false : $scope.disableSearch = true;
        };
        $scope.searchWord = (word) => {
            let data = {word : word};
            $rootScope.httpRequest("searchWord", "POST", data, (data) => {
                if (!data.error) {
                    $scope.searchData = data.message;
                } else {
                    $scope.searchData = false;
                    $scope.sWord = null;
                    $scope.message = data.message;
                    $timeout(() => {
                        $scope.message = null;
                    }, 2000);
                    $scope.enableSearch($scope.word);
                }
            });
        };
        $scope.deleteFromSearch = (word) => {
            $scope.deleteWord(word);
            $scope.searchData = false;
            $scope.sWord = null;
            $scope.enableSearch($scope.word);
        };
    }
]);

