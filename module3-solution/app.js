(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',['MenuSearchService', NarrowItDownController] )
.service('MenuSearchService', ['$http', 'ApiBasePath', MenuSearchService] )
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', " https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '&found',
      myTitle: '@title',
      onRemove: '&'
    },

    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}

function NarrowItDownController(MenuSearchService ) {
  var list = this;

  list.searchTerm = "";

  var origTitle = "Number of items in menu";

  var promise = MenuSearchService.getMatchedMenuItems();
  promise.then(function (response) {
    list.found = response;
    list.title = origTitle + " (" + list.found.length + " found )";
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  list.onRemove = function (itemIndex) {
    list.found.splice(itemIndex.index, 1);
    this.title = origTitle + " (" + list.found.length + " items )";
  };

  list.searchMenu = function(){
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
    promise.then(function (response) {
      list.found = response;
      list.title = origTitle + " (" + list.found.length + " items )";
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };
}

function MenuSearchService($http, ApiBasePath) {
  var service = this;
  //this.foundItems;
  service.getMatchedMenuItems = function(searchTerm){
    return $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json")
     }).then( function(response){
        var foundItems = new Array();
        var itemsToSearch = response.data.menu_items;
        console.log("itemsToSearch length " + itemsToSearch.length);

        if(searchTerm == null || searchTerm == ""){
          console.log("return unsearched items");
          return itemsToSearch;
        }
        for(var index=0; index < itemsToSearch.length; index++){
      //    console.log(index);
          if( itemsToSearch[index].name.toLowerCase().indexOf(searchTerm) != -1){
            foundItems.push(itemsToSearch[index]);
            console.log("adding matching item");
          }
        }
            console.log("foundItems length =" + foundItems.length);
        return foundItems;
     });
  };
}

})();
