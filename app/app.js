var myApp = angular.module('myApp', ['ngMaterial', 'ngResource', 'ui.router','ngAnimate']);


myApp.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);


myApp.config( '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
        .state('board_create', {
            url: "/board",
            templateUrl: "./components/board/board_define.html",
            controller: 'boardCtrl'
        })
        .state('boards_list', {
            url: "/boards",
            templateUrl: "./components/board/boards_list.html",
            controller: 'boardCtrl'
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
});

myApp.config(function($mdThemingProvider, $mdIconProvider){
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
        .icon("web"     , "./assets/svg/ic_language_48px.svg"       , 512);


    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('red');

});


myApp.controller("defaultCtrl", function($scope) {

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
});


/*
Just a comment */
