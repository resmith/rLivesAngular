myApp = angular.module('myApp');


myApp.factory("BoardUrl", function($resource ) {
        return $resource("http://localhost:2403/boards/:id", {boardId: '@id'})
});

/***** ---- boardIndexCtrl functions ----- *****/

/* Provide the boardType for drop downs */
myApp.controller("boardIndexCtrl",function($scope, BoardUrl) {
    $scope.boardTypes = [
        {"value": "All", "label": "All"},
        {"value": "pers", "label": "Personal"},
        {"value": "fmly", "label": "Family"},
        {"value": "frnd", "label": "Friends"},
        {"value": "busn", "label": "Business"},
        {"value": "schl", "label": "School"},
        {"value": "othr", "label": "Other"}
    ];

    BoardUrl.query(function (data) {
        $scope.boards = data;
    });


    $scope.deleteBoard = function (board) {
        if (popupService.showPopup('Really delete?')) {
            BoardUrl.$delete(function () {
                indx = boards.indexOf(board);
                boards.splice(indx, 1);
            })
        }
    };

    /* This is the code to provide the filter when the user selects the board type */
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

    /*  Code for the tile - color, size, etc.   */

    /*var spans = [
        {length: 80, cols: 1, rows: 1},
        {length: 160, cols: 1, rows: 1},
        {length: 240, cols: 1, rows: 1},
        {length: 320, cols: 1, rows: 1},
        {length: 400, cols: 1, rows: 1},
        {length: 500, cols: 1, rows: 1},

    ];
    */

    this.tileSpan = function (board){
        var span = {};
        var length =

        tile = {
            rowSpan: calcRowSpan,
            colSpan: calcColSpan,
            color: randomColor()
        } ;
        return tile;
    }

    function calcRowSpan() {
        return (Math.floor(Math.random() * 4));
    }

    function calcColSpan() {
        return (Math.floor(Math.random() * 12));
    }

    function randomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    function randomSpan() {
        var r = Math.random();
        if (r < 0.8) {
            return 1;
        } else if (r < 0.9) {
            return 2;
        } else {
            return 3;
        }
    }
});

        /*
         $scope.listBoards = function () {
         BoardUrl.query(function (data) {
         $scope.boards = data;
         })
         };
         */

/*
        BoardUrl.query(function (BoardUrl) {
            $scope.board = BoardUrl;
        })
*/


myApp.controller("boardSaveCtrl", function($scope, $stateParams, BoardUrl) {
    /* $scope.data = { boards: {}}; */
    $scope.boardTypes = [
        {"value": "pers", "label": "Personal"},
        {"value": "fmly", "label": "Family"},
        {"value": "frnd", "label": "Friends"},
        {"value": "busn", "label": "Business"},
        {"value": "schl", "label": "School"},
        {"value": "othr", "label": "Other"}
    ];
        BoardUrl.get({id: $stateParams.boardId}, function(data) {
            $scope.board = data;
        });



    $scope.createBoard = function (board) {
        BoardUrl.save(board)
        .$promise
            .then(function (board) {
                $scope.message = "BoardUrl " + board.name + " successfully saved!";
                $scope.messageClass = "messageSuccessfull";
                $scope.saveSuccessfull = true;
                $scope.board = {};
                $state = "board_create";
            },
            function() {
                $scope.data.error = error;
                $scope.message = "Issue with save ";
                $scope.messageClass = "messageError";
                $scope.saveSuccessfull = false;
            });
    };
});



myApp.controller("boardShowCtrl", function($scope,  $stateParams, BoardUrl) {
    BoardUrl.get({id: $stateParams.boardId}, function(data) {
        $scope.board = data;
    });
});




/*
    $scope.createBoard = function (board) {
        console.log("CreateBoard" );
        console.log("BoardUrl=" + $scope.boardsResource(board) );
        console.log("createBoard=" + $scope.boardsResource(board) );
        new $scope.boardsResource(board).$save().then(function(newBoard) {
            $scope.boards.push(newBoard);
            $scope.displayMode = "list";
        });
    }

    $scope.updateBoard = function (board) {
        board.$save();
        $scope.displayMode = "list";
    }

    $scope.saveEdit = function (board) {
        if (angular.isDefined(board.id)) {
            $scope.updateBoard(board);
        } else {
            $scope.createBoard(board);
        }
    }

    $scope.cancelEdit = function () {
        if ($scope.currentBoard && $scope.currentBoard.$get) {
            $scope.currentBoard.$get();
        }
        $scope.currentBoard = {};
        $scope.displayMode = "list";
    }

    $scope.listBoards();
});
*/


/*
 myApp.controller("boardIndexCtrl",["$scope", "BoardUrl",
 function editOrCreateBoard(board) {
 $scope.currentBoard = board ? board : {};
 $scope.displayMode = "edit";
 }
 ]);
 */
