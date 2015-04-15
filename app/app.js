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
            templateUrl: "./components/user/user_define.html"
        })
        .state('sign_in', {
            url: "/sign_in",
            templateUrl: "./components/user/user_signin.html"
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
        .state('image_upload', {
            url: "/image",
            templateUrl: "./components/image/image_upload.html",
            controller: 'imageUploadCtrl'
        })
        .state('select_media', {
            url: "/media",
            templateUrl: "./components/media/select_media.html",
            controller: 'imageUploadCtrl'
        })
        .state('image_link_board', {
            url: "/image/board",
            templateUrl: "./components/image/select_board.html",
            controller: 'imageSelectBoardCtrl as imageSelectBoard'
        })
        .state('images_view', {
            url: "/image",
            templateUrl: "./components/media/image_upload.html"
        })
        .state('people_list', {
            url: "/people",
            templateUrl: "./components/people/people_list.html",
            controller: 'peopleListCtrl'
        })
        .state('text_create', {
            url: "/text",
            templateUrl: "./components/text/text_define.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"]; }
        })
        .state('message_create', {
            url: "/message",
            templateUrl: "./components/message/message_define.html",
            controller: 'peopleListCtrl'
        })
    ;
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
        .icon("delete"     , "./assets/svg/ic_delete_48px.svg"       , 48)

        .icon("add"     , "./assets/svg/ic_add_circle_24px.svg"       , 48)
        .icon("link"     , "./assets/svg/ic_link_24px.svg"       , 48)
        .icon("view"     , "./assets/svg/ic_eye_24px.svg"       , 48)


    $mdThemingProvider.theme('default')
        .primaryPalette('brown')
        .accentPalette('blue-grey');

}]);

myApp.service("crossvars", function Crossvar() {
// Set the variables and constants that work across controllers
    var crossvars = this;

    crossvars.uploaded_media = "Default";

    crossvars.COLORS = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00', '#d7ccc8', '#bcaaa4', '#795548', '#d7ccc8', '#bcaaa4', '#8d6e63', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#cfd8dc', '#b0bec5', '#78909c'];

    crossvars.boardTypes_All = [
            {"value": "All", "label": "All"},
            {"value": "pers", "label": "Personal"},
            {"value": "fmly", "label": "Family"},
            {"value": "frnd", "label": "Friends"},
            {"value": "busn", "label": "Business"},
            {"value": "schl", "label": "School"},
            {"value": "othr", "label": "Other"}
        ];
    });


myApp.controller('HeaderCtrl', function($scope, $mdSidenav, $log) {

    $scope.toggleLeftNav = function () {
       if ($scope.leftNavOpen ) {
           $scope.leftNavOpen = false;
           $scope.leftNavFlex = 0;
           $scope.leftNavSrc = "";

       } else {
           $scope.leftNavOpen = true;
           $scope.leftNavFlex = 10;
           $scope.leftNavSrc = "./partials/leftnav.html"
       }
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


myApp.controller('defaultCtrl', function($scope, $mdToast, $animate) {
    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };
    $scope.showCustomToast = function() {
        $mdToast.show({
            controller: 'ToastCtrl',
            templateUrl: 'toast-template.html',
            hideDelay: 6000,
            position: $scope.getToastPosition()
        });
    };
    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .content($scope.message)
                .position($scope.getToastPosition())
                .hideDelay(3000)
        );
    };
    $scope.showActionToast = function() {
        var toast = $mdToast.simple()
            .content('Action Toast!')
            .action('OK')
            .highlightAction(false)
            .position($scope.getToastPosition());
        $mdToast.show(toast).then(function() {
            alert('You clicked \'OK\'.');
        });
    };
})
myApp.controller('ToastCtrl', function($scope, $mdToast) {
        $scope.closeToast = function() {
            $mdToast.hide();
        };
    });

