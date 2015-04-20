myApp = angular.module('myApp');

/***** ---- Set the HTTP and Resource functions  ----- *****/
myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

myApp.factory("BoardUrl", function($resource ) {
    return $resource("http://localhost:2403/boards/:id", {boardId: '@id'})
});

/***** ---- Image Controller Functions ----- *****/
/* Provide the imageType for drop downs */
myApp.controller("LinkPeople2BoardsCtrl", function($scope, BoardUrl) {
    /*var LinkPeople2Boards = this;*/

    $scope.message = "";
    $scope.people = "";
    $scope.boards = "";
    $scope.permissons = "";
    $scope.boardType;

    $scope.People = [
        {"name": "All", "email": "All"},
        {"name": "pers", "email": "Personal"},
        {"name": "fmly", "email": "Family"},
        {"name": "frnd", "email": "Friends"},
        {"name": "busn", "email": "Business"},
        {"name": "schl", "email": "School"},
        {"name": "othr", "email": "Other"}
    ];


    $scope.boardTypes = [
        {"value": "All", "label": "All"},
        {"value": "pers", "label": "Personal"},
        {"value": "fmly", "label": "Family"},
        {"value": "frnd", "label": "Friends"},
        {"value": "busn", "label": "Business"},
        {"value": "schl", "label": "School"},
        {"value": "othr", "label": "Other"}
    ];

    $scope.boardPermissions = [
        {"value": "View", "label": "View"},
        {"value": "Update", "label": "Update"}

    ];



    BoardUrl.query(function (data) {
        $scope.boards = data;
    });



    $scope.createpeople2Boards = function (people, boards, permissons) {
/*        ImageUrl.save(image)
            .$promise
            .then(function (image) {
                $scope.message = "ImageUrl " + image.name + " successfully saved!";
                $scope.messageClass = "messageSuccessfull";
                $scope.saveSuccessfull = true;
                crossvars.uploaded_media = {'id': image.id,
                    'name': image.name,
                    'type': 'image'};
                $state.go('image_link_board');
            },
            function() {
                $scope.data.error = error;
                $scope.message = "Issue with save ";
                $scope.messageClass = "messageError";
                $scope.saveSuccessfull = false;
            });*/
    };

    $scope.boardTypeMatch = function (board) {
        if (!angular.isDefined(board) ||
            !angular.isDefined($scope.search)
        ) {  return true; }
        if (!angular.isDefined(board.type) ||
            $scope.search.type == "All"
        ) {  return true; }
        var typeMatch = false;
        if (angular.isDefined(board.type) &&
            angular.isDefined($scope.search.type)) {
            typeMatch = board.type === $scope.search.type;
        }
        return typeMatch;
    };

});


myApp.controller("imageSelectBoardCtrl",function($scope, BoardUrl, Board2ImagesUrl, crossvars) {
    var imageSelectMedia = this;
    $scope.uploaded_media = crossvars.uploaded_media;

    BoardUrl.query(function (data) {
        $scope.images = data;

        var span;

        for (var i = 0; i < $scope.images.length; i++) {
            span = 2;
            $scope.images[i].color = crossvars.COLORS[Math.floor(Math.random() * crossvars.COLORS.length)];
            $scope.images[i].colSpan = span;
            $scope.images[i].rowSpan = span;
            $scope.images[i].size = "2";
        }
    });

    $scope.image_link_board = function (imageId, boardId) {
        console.log("imageId=" + imageId);
        console.log("boardId=" + boardId);

        var Image2Board = {
            'boardId' : boardId,
            'imageId' : imageId
        };

        Board2ImagesUrl.save(Image2Board)
            .$promise
            .then(function (image) {
                $scope.message = "Image2Board successfully saved!";
                $scope.messageClass = "messageSuccessfull";
                $scope.saveSuccessfull = true;
            },
            function() {
                $scope.data.error = error;
                $scope.message = "Issue with save ";
                $scope.messageClass = "messageError";
                $scope.saveSuccessfull = false;
            });
    };

    /* This is the code to provide the filter when the user selects the image type */
    $scope.imageTypeMatch = function (image) {
        if (!angular.isDefined(image) ||
            !angular.isDefined($scope.search)
        ) {  return true; }
        if (!angular.isDefined(image.type) ||
            $scope.search.type == "All"
        ) {  return true; }
        var typeMatch = false;
        if (angular.isDefined(image.type) &&
            angular.isDefined($scope.search.type)) {
            typeMatch = image.type === $scope.search.type;
        }
        return typeMatch;
    };

});

myApp.controller("imageShowCtrl", function($scope,  $stateParams, ImageUrl) {
    ImageUrl.get({id: $stateParams.imageId}, function(data) {
        $scope.image = data;
    });
});




/*
 $scope.createImage = function (image) {
 console.log("CreateImage" );
 console.log("ImageUrl=" + $scope.imagesResource(image) );
 console.log("createImage=" + $scope.imagesResource(image) );
 new $scope.imagesResource(image).$save().then(function(newImage) {
 $scope.images.push(newImage);
 $scope.displayMode = "list";
 });
 }

 $scope.updateImage = function (image) {
 image.$save();
 $scope.displayMode = "list";
 }

 $scope.saveEdit = function (image) {
 if (angular.isDefined(image.id)) {
 $scope.updateImage(image);
 } else {
 $scope.createImage(image);
 }
 }

 $scope.cancelEdit = function () {
 if ($scope.currentImage && $scope.currentImage.$get) {
 $scope.currentImage.$get();
 }
 $scope.currentImage = {};
 $scope.displayMode = "list";
 }

 $scope.listImages();
 });
 */


/*
 myApp.controller("imageIndexCtrl",["$scope", "ImageUrl",
 function editOrCreateImage(image) {
 $scope.currentImage = image ? image : {};
 $scope.displayMode = "edit";
 }
 ]);
 */
