(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/public/myinfo/myinfo.html',
      controller: 'RegController',
      controllerAs: 'regCtrl',
      resolve: {
        menuitem: ['MenuService', 'RegistrationService', function (MenuService, RegistrationService) {
          console.log("xxxxx " + RegistrationService.getRegInfo().menunumber);
          if(RegistrationService.getRegInfo().menunumber !== undefined &&
        RegistrationService.getRegInfo().menunumber !== ''){
            console.log("xxxxx not empty");
            MenuService.getMenuItemByShortName(RegistrationService.getRegInfo().menunumber)
            .then(function(response){
              RegistrationService.setMenuItem(response);
              console.log('set reg svc menu  in routes: '+ JSON.stringify(response, null, 4));
              console.log('set reg svc menu  in routes: '+ JSON.stringify(response.data, null, 4));
            })
            .catch(function(error){
              console.log(error);
            })
          } else {
            console.log("xxxxx  empty");
            return {};
          }
        }]
      }
    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/signup/signup.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl'
      // resolve: {
      //   menuCategories: ['MenuService', function (MenuService) {
      //     return MenuService.getMenuItems();
      //   }]
      // }
    })


    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
