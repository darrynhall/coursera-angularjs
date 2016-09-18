(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.dishes = "";

  $scope.message = "";

  $scope.checkDishCount = function () {

    var dishesInput = $scope.dishes;

    var dishArray = dishesInput.split(",");

    if(dishesInput == null || dishesInput.length ==0){
        $scope.message = "Please enter data first";
    } else if( dishArray.length >= 1 && dishArray.length <=3){
        $scope.message =  "Enjoy!";
    } else if( dishArray.length > 3){
        $scope.message =   "Too much!";
    }

  };
}

})();
