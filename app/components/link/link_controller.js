myApp = angular.module('myApp');

/***** ---- Set the HTTP and Resource functions  ----- *****/
myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

myApp.factory("ImageUrl", function($resource ) {
    return $resource("http://localhost:2403/images/:id", {imageId: '@id'})
});

myApp.factory("BoardUrl", function($resource ) {
    return $resource("http://localhost:2403/boards/:id", {boardId: '@id'})
});

myApp.factory("Board2ImagesUrl", function($resource ) {
    return $resource("http://localhost:2403/board2images/:id", {Board2ImageId: '@id' }, {
        query: {method: "GET", isArray: false}
    });
});

/***** ---- Image Controller Functions ----- *****/
/* Provide the imageType for drop downs */
myApp.controller("imageUploadCtrl", function($scope, $stateParams, $state, ImageUrl, crossvars) {
    var imageUploadCtrl = this;

    $scope.image = {};

    $scope.createImage = function (image) {
        ImageUrl.save(image)
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
            });
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
