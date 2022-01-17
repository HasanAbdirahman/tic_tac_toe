/*----- app's state (variables) -----*/
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let x, y;
let player = "X";
let firstDiag, secondDiag, leftVert, midVert, rightVert, topHoriz, midHoriz, botHoriz;

/*----- cached element references -----*/
let cells = document.getElementsByClassName("cell");

/*----- event listeners -----*/
Array.from(cells).forEach(cell => cell.addEventListener("click", handleClick));

/*----- functions -----*/
function handleClick(evt) {
    if (!evt.target.innerHTML) {
        [x,y] = [evt.target.id[0], evt.target.id[1]]
        board[x][y] = player;
        player = player == "X" ? "O" : "X";
        render(evt, [x, y]);
        // console.log(player);
        // console.log(board);
        checkWin();
    }
}

function render(evt, [x, y]) {
    evt.target.innerHTML = board[x][y];
}

function checkWin() {
    createConditions();
    if (player === "O" && (firstDiag || secondDiag || leftVert || midVert || rightVert || topHoriz || midHoriz || botHoriz)) {
        console.log("Winner is X")
    } else if (player === "X" && (firstDiag || secondDiag || leftVert || midVert || rightVert || topHoriz || midHoriz || botHoriz)) {
        console.log("Winner is O")
    }
}

function createConditions() {
    firstDiag = board[1][1] !== "" && (board[0][0] === board[1][1] && board[1][1] === board[2][2]);
    secondDiag = board[1][1] !== "" && (board[0][2] === board[1][1] && board[1][1] === board[2][0]);
    leftVert = board[0][0] !== "" && (board[0][0] === board[1][0] && board[1][0] === board[2][0]);
    midVert = board[0][1] !== "" && (board[0][1] === board[1][1] && board[1][1] === board[2][1]);
    rightVert = board[0][2] !== "" && (board[0][2] === board[1][2] && board[1][2] === board[2][2]);
    topHoriz = board[0][0] !== "" && (board[0][0] === board[0][1] && board[0][1] === board[0][2]);
    midHoriz = board[1][0] !== "" && (board[1][0] === board[1][1] && board[1][1] === board[2][0]);
    botHoriz = board[2][0] !== "" && (board[2][0] === board[2][1] && board[2][1] === board[2][2]);
}

