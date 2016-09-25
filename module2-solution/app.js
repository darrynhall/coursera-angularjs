(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('BuyController', BuyController)
.controller('BoughtController', BoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

BoughtController.$inject = ['ShoppingListCheckOffService'];
function BoughtController(ShoppingListCheckOffService) {
  var itemAdder = this;

 itemAdder.getBoughtItems = function(){
    return ShoppingListCheckOffService.getBoughtItems();
  };

}


BuyController.$inject = ['ShoppingListCheckOffService'];
function BuyController(ShoppingListCheckOffService) {
  
  var showList = this;

  showList.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  showList.removeItemToBuy = function (itemIndex, name, quantity)  {

    ShoppingListCheckOffService.addBoughtItem(name, quantity);

    ShoppingListCheckOffService.removeItemToBuy(itemIndex);

  };
}


function ShoppingListCheckOffService() {
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
