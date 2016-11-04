(function () {
"use strict";

angular.module('public')
.controller('MenuController', MenuController)
.controller('RegController', RegController)
.service('RegistrationService', RegistrationService);
//, 'RegistrationService'


MenuController.$inject = ['menuCategories', 'RegistrationService' ];
function MenuController(menuCategories, RegistrationService) {
  var $ctrl = this;
  $ctrl.menuCategories = menuCategories;

  $ctrl.firstname = '';
  $ctrl.lastname = '';
  $ctrl.email = '';
  $ctrl.phone = '';
  $ctrl.menunumber = '';

  $ctrl.confirmSave = false;

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
    console.log("$ctrl.menuCategories  = " + $ctrl.menuCategories.data );

      return false;
  };

}

RegController.$inject = ['menuCategories', 'RegistrationService' ];
function RegController(menuCategories, RegistrationService) {
  var $ctrl = this;
  $ctrl.menuCategories = menuCategories;

  $ctrl.getRegInfo = function(){
    return RegistrationService.getRegInfo();
  };
}

function RegistrationService() {
  var service = this;

  var regInfo =
    {firstName:"",
    lastName:"",
    email: "",
    phone : "",
  menunumber : "" };

   service.setRegInfo = function(pfirst, plast, pemail, pphone, pmenunumber){
    regInfo.firstName = pfirst;
    regInfo.lastName = plast;
    regInfo.email = pemail;
    regInfo.phone = pphone;
    regInfo.menunumber = pmenunumber;
  };

  service.getRegInfo = function(){
    return regInfo;
  };

}



})();
