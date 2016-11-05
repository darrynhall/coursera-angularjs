(function () {
"use strict";

angular.module('public')
.controller('MenuController', MenuController)
.controller('RegController', RegController)
//.service('MenuService', MenuService)
.service('RegistrationService', RegistrationService);
//, 'RegistrationService'


MenuController.$inject = ['RegistrationService' , 'MenuService'];
function MenuController( RegistrationService, MenuService) {
  var $ctrl = this;
  //$ctrl.menuCategories = menuCategories;

  $ctrl.firstname = '';
  $ctrl.lastname = '';
  $ctrl.email = '';
  $ctrl.phone = '';
  $ctrl.menunumber = '';

  $ctrl.confirmSave = false;

  $ctrl.isInvalidMenuNumber = false;

  $ctrl.signup= function(){
      RegistrationService.setRegInfo( $ctrl.firstname ,   $ctrl.lastname,
        $ctrl.email,
        $ctrl.phone,
        $ctrl.menunumber
      );
      $ctrl.confirmSave = true;
  };

  $ctrl.isValidMenuNumber= function(){
  //  console.log("ctrl.menunumber  = " + $ctrl.menunumber );
    //console.log("$ctrl.menuCategories  = " + $ctrl.menuCategories.data );


      return false;
  };

}

RegController.$inject = [ 'RegistrationService', 'MenuService', 'menuitem', 'ApiPath' ];
function RegController( RegistrationService, MenuService, menuitem, ApiPath) {
  var $ctrl = this;
  $ctrl.menuitem = menuitem;
  $ctrl.apipath = ApiPath + '/images/';
//  $ctrl.menuCategories = menuCategories;

  $ctrl.getRegInfo = function(){
    return RegistrationService.getRegInfo();
  };

//  $ctrl.menuitem = MenuService.getMenuItemByShortName($ctrl.getRegInfo().menunumber);

}

//RegistrationService.$inject = [ 'MenuService' ];
function RegistrationService() {
  var service = this;

  var regInfo =
    {firstName:"",
    lastName:"",
    email: "",
    phone : "",
  menunumber : "",
 menuitem: [] };

   service.setRegInfo = function(pfirst, plast, pemail, pphone, pmenunumber){
    regInfo.firstName = pfirst;
    regInfo.lastName = plast;
    regInfo.email = pemail;
    regInfo.phone = pphone;
    regInfo.menunumber = pmenunumber;
  //  regInfo.menuitem = MenuService.getMenuItemByShortName(pmenunumber);

  };

  service.getRegInfo = function(){
    return regInfo;
  };

  service.setMenuItem = function(result){
    regInfo.menuitem = result;
    console.log('set reg svc menu item: ' + result );
  };
}



})();
