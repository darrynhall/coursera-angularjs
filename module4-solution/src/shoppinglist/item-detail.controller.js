(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['categoryItems']
function ItemDetailController(categoryItems) {
  var itemDetail = this;
  itemDetail.categoryItems = categoryItems;
  console.log('ItemDetailController(itemDetail.categoryItems) :', itemDetail.categoryItems);
}

})();
