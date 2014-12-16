(function () {
    'use strict';

    angular.module('tp.app', ['ngRoute', 'ui.bootstrap', 'ic.mainMenu', 'ic.user'])

    .config(['$routeProvider', '$httpProvider',
    function (routeProvider, httpProvider) {
            routeProvider.
            when('/', {
                templateUrl: 'app_modules/user/users-manager.html',
                controller: 'UsersManagerCtrl'
            }).
            when('/users-manager', {
                templateUrl: 'app_modules/user/users-manager.html',
                controller: 'UsersManagerCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

            // httpProvider.defaults.useXDomain = true;
            // delete httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .controller('AppCtrl', function($scope, MainMenuService){

        initialize();

        function initialize(){
            //SNAPPER
            $scope.snapper = new Snap({
                element: document.getElementById('content'),
                disable: 'right'
            });

            //MAIN MENU ITEMS
            $scope.mainMenuItems = MainMenuService.getItems();

            //ADDING MAIN MENU SERVICE ON THE SCOPE
            $scope.mainMenuService = MainMenuService;
        }

        $scope.itemClicked = function(item){
            $scope.leftInOut();
            $scope.mainMenuService.routeTo(item);
        };

        $scope.leftInOut = function(){
            if($scope.snapper.state().state == 'closed') $scope.snapper.open('left');
            if($scope.snapper.state().state == 'left') $scope.snapper.close('left');
        };



    });

}());