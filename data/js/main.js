var app = angular.module("mainModule", []);

app.controller("mainCtrl", ['$scope', '$rootScope', '$http',
    function ($scope, $rootScope, $http) {
    console.log('eev');
    $scope.formData = [];
        $scope.addWord = function(english, translation) {
            console.log('vax');
            var Data = {
                english : english,
                translation : translation
            };
            console.log(Data);
            $scope.formData = JSON.stringify(Data);
            $http({url : "/addWord", method : "POST", data : $scope.formData}).success(function(data) {
                $scope.english = '';
                $scope.translation = '';
            })
        }
    }
]);

