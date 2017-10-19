var board = new Array();
var score = 0;
var hasConflicted = new Array();
$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    score = 0;
    updateBoardView();
}
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50 + "px");
                theNumberCell.css('left', getPosLeft(i, j) + 50 + "px");
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j) + "px");
                theNumberCell.css('left', getPosLeft(i, j) + "px");
                theNumberCell.css('background-color', getBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(designName(board[i][j]));
                console.log(designName(board[i][j]));
            }
            hasConflicted[i][j] = false;
        }
    }
}
function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    // randNumber=Math.random()>0.5?2:4;
                    // board[i][j]=randNumber;
                    // showNumberWithAnimation(randx,randy,randNumber);
                    // return true;
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //随机数字
    var randNumber = Math.random() > 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    //在随机位置显示随机数字
   showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 39://right
            if (moveRight()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 40://down
            if (moveDown()) {
                generateOneNumber();
                isgameover();
            }
            break;
        case 38://up
            if (moveUp()) {
                generateOneNumber();
                isgameover();
            }
            break;
        default://default
            break;
    }
});
function isgameover() {
    if (nospace(board) && nomove()) {
        gameOver()
    }
}
function gameOver() {
    alert("game over");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[i][k] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        hasConflicted[i][k] = true;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j > -1; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k >j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        hasConflicted[i][k] = true;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i > -1; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[k][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        hasConflicted[k][j] = true;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][j] == board[k][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        hasConflicted[k][j] = true;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}