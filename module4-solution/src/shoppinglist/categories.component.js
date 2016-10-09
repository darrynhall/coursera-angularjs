(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/shoppinglist/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
