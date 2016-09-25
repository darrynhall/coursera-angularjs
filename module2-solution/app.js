(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('BuyController', BuyController)
.controller('BoughtController', BoughtController)
.service('ShoppingListService', ShoppingListService);

BoughtController.$inject = ['ShoppingListService'];
function BoughtController(ShoppingListService) {
  var itemAdder = this;

 itemAdder.getBoughtItems = function(){
    return ShoppingListService.getBoughtItems();
  };

}


BuyController.$inject = ['ShoppingListService'];
function BuyController(ShoppingListService) {
  var showList = this;

  showList.itemsToBuy = ShoppingListService.getItemsToBuy();

  showList.removeItemToBuy = function (itemIndex, name, quantity)  {

    ShoppingListService.addBoughtItem(name, quantity);

    ShoppingListService.removeItemToBuy(itemIndex);

  };
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var itemsToBuy =  [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    { name:"Slices of Cake",
      quantity: 750
    }
  ];

  var boughtItems = [];

  service.addItemToBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsToBuy.push(item);
  };

  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);

  };

  service.removeItemToBuy = function (itemIdex) {
    itemsToBuy.splice(itemIdex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
