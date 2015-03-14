myApp = angular.module('myApp');

myApp.controller("boardCtrl", function($scope) {
});

myApp.factory("Board", function($resource ) {
        return $resource("http://localhost:2403/boards/:id", {boardId: '@id'})
});

myApp.controller("boardIndexCtrl", function($scope, Board) {
    Board.query(function(data){
        $scope.boards = data;
    });
});

myApp.controller("boardSaveCtrl", function($scope, Board) {

    var $scope.board = {};
    var $scope.message = "";



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
                this.message = "Board " + board.name + " successfully saved!";
                this.messageClass = "messageSuccessfull";
                this.saveSuccessfull = true;
                this.board = {};
            },
            function() {
                /*$scope.data.error = error;*/
                this.message = "Issue with save ";
                this.messageClass = "messageError";
                this.saveSuccessfull = false;
            });
    };
});



/*
myApp.controller("boardShowCtrl", function($scope, Board) {
    Board.get({ id: 1}, function(data) {
        $scope.board = data;
    });
});



    $scope.listBoards = function () {
        Board.query(function (data) {
            $scope.boards = data;
        });
    };

    $scope.deleteBoard = function (board) {
        board.$delete().then(function () {
            $scope.boards.splice($scope.boards.indexOf(board), 1);
        });
        $scope.displayMode = "list";
    }

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

    $scope.editOrCreateBoard = function (board) {
        $scope.currentBoard = board ? board : {};
        $scope.displayMode = "edit";
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


