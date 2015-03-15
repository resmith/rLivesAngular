myApp = angular.module('myApp');


myApp.factory("Board", function($resource ) {
        return $resource("http://localhost:2403/boards/:id", {boardId: '@id'})
});

/* ---- boardIndexCtrl functions ----- */

myApp.controller("boardIndexCtrl",function($scope, Board) {

    Board.query(function (data) {
        $scope.boards = data;
    });


    $scope.deleteBoard = function (board) {
        if (popupService.showPopup('Really delete?')) {
            Board.$delete(function () {
                indx = boards.indexOf(board);
                boards.splice(indx, 1);
            })
        }
    };
});

        /*
         $scope.listBoards = function () {
         Board.query(function (data) {
         $scope.boards = data;
         })
         };
         */

/*
        Board.query(function (Board) {
            $scope.board = Board;
        })
*/


myApp.controller("boardSaveCtrl", function($scope, $stateParams, Board) {
    /* $scope.data = { boards: {}}; */

        Board.get({id: $stateParams.boardId}, function(data) {
            $scope.board = data;
        });

    $scope.boardTypes = [
        {"value": "pers", "label": "Personal"},
        {"value": "fmly", "label": "Family"},
        {"value": "frnd", "label": "Friends"},
        {"value": "busn", "label": "Business"},
        {"value": "schl", "label": "School"},
        {"value": "othr", "label": "Other"}
    ];

    $scope.createBoard = function (board) {
        Board.save(board)
        .$promise
            .then(function (board) {
                $scope.message = "Board " + board.name + " successfully saved!";
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



myApp.controller("boardShowCtrl", function($scope, Board) {
    Board.get({ id: 1}, function(data) {
        $scope.board = data;
    });
});

/*
    $scope.createBoard = function (board) {
        console.log("CreateBoard" );
        console.log("Board=" + $scope.boardsResource(board) );
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
 myApp.controller("boardIndexCtrl",["$scope", "Board",
 function editOrCreateBoard(board) {
 $scope.currentBoard = board ? board : {};
 $scope.displayMode = "edit";
 }
 ]);
 */
