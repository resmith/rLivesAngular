var myApp = angular.module('myApp', ['ngMaterial', 'ngResource', 'ui.router','ngAnimate']);
/*

myApp.service('popupService',function($window){
        this.showPopup=function(message){
            return $window.confirm(message);
        }
    });
*/


myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    // For uirouter docs see https://github.com/angular-ui/ui-router
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "index.html"
        })
        .state('register', {
            url: "/register",
            templateUrl: "/user/register.html"
        })
        .state('sign_in', {
            url: "/signin",
            templateUrl: "/user/sign_in.html"
        })
        .state('boards_list', {
            url: "/boards",
            templateUrl: "./components/board/boards_list.html",
            controller: 'boardIndexCtrl'
        })
        .state('board_create', {
            url: "/board",
            templateUrl: "./components/board/board_define.html",
            controller: 'boardSaveCtrl as Board'
        })
        .state('board_edit', {
            url: "/board/:boardId/edit",
            templateUrl: "./components/board/board_define.html",
            controller: 'boardSaveCtrl as Board'
        })
        .state('board_show', {
            url: "/board/:boardId",
            templateUrl: "./components/board/board_show.html",
            controller: 'boardShowCtrl as Board'
        })
        .state('select_media', {
            url: "/media",
            templateUrl: "./components/media/select_media.html"
        })
        .state('image_upload', {
            url: "/image",
            templateUrl: "./components/media/image_upload.html"
        })
        .state('images_view', {
            url: "/image",
            templateUrl: "./components/media/image_upload.html"
        })
        .state('people_list', {
            url: "/people",
            templateUrl: "./components/people/people_list.html"
        })
        .state('text.create', {
            url: "/text",
            templateUrl: "./components/text_create.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        });
}]);

myApp.config(['$mdThemingProvider', '$mdIconProvider',
        function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu"    , "./assets/svg/menu.svg"        , 24)
        .icon("board"   , "./assets/svg/ic_folder_24px.svg"       , 24)
        .icon("picture", "./assets/svg/ic_image_24px.svg" , 24)
        .icon("video", "./assets/svg/ic_videocam_24px.svg" , 512)
        .icon("audio", "./assets/svg/ic_mic_24px.svg" , 512)
        .icon("document", "./assets/svg/ic_description_24px.svg" , 512)
        .icon("other", "./assets/svg/ic_attach_file_24px.svg" , 512)

        .icon("story"   , "./assets/svg/ic_text_format_24px.svg"    , 512)
        .icon("message" , "./assets/svg/ic_message_24px.svg"     , 512)
        .icon("person"  , "./assets/svg/ic_person_24px.svg"       , 512)
        .icon("web"     , "./assets/svg/ic_language_48px.svg"       , 512)

        .icon("edit"     , "./assets/svg/ic_edit_48px.svg"       , 48)
        .icon("delete"     , "./assets/svg/ic_delete_48px.svg"       , 48);


    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('blue-grey');

}]);


myApp.controller('HeaderCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.leftNavOpen = true;

    $scope.toggleLeftNav = function () {
        $log.debug("1");
        if ($scope.leftNavOpen == true ) { $scope.leftNavOpen = false;} else {$scope.leftNavOpen = true;}
        $log.debug("2");
        $mdSidenav('left').toggle()
            .then(function(){
                $log.debug("close LEFT is done");
            });
        $log.debug("3");
        $log.debug("leftNavOpen = " + $scope.leftNavOpen);
    };
});

myApp.controller("defaultCtrl", ['$scope', function($scope) {

    $scope.message = "";

    $scope.getError = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Please enter a value";
            } else if (error.email) {
                return "Please enter a valid email address";
            }
        }
    }
}]);


