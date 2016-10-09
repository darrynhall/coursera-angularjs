(function () {
'use strict';

var module = angular.module('data');
module.service('MenuDataService', MenuDataService);
module.constant("ApiBasePath",  "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q', '$timeout', '$http','ApiBasePath' ]
function MenuDataService($q, $timeout, $http, ApiBasePath ) {
  var service = this;

  var items = [];

  var categoryItems = [];


  service.getAllCategories  = function () {
    var deferred = $q.defer();
    console.log('get items');

    service.getCategories()
    .then( function(response) {
      items = response.data;
      console.log(' items', items);
      deferred.resolve(items);
    })
    .catch( function(error){
      console.log(error);
    })

    return deferred.promise;
  };

  service.getItemsForCategory = function (itemId) {

    console.log('item id passed in', itemId);
    var deferred = $q.defer();
    console.log('get categoryItems');

    service.getItemsByCategoryShortName(itemId)
    .then( function(response) {
      categoryItems = response.data.menu_items;
      console.log('getItemsByCategoryShortName categoryItems', categoryItems);
      deferred.resolve(categoryItems);
    })
    .catch( function(error){
      console.log(error);
    })

    return deferred.promise;
  };

  service.getCategories = function(){
      return  $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
        });
      };

    service.getItemsByCategoryShortName = function(shortName){
        return  $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json?category=" + shortName)
          });

  };


}

})();
