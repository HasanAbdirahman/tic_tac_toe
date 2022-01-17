/*----- app's state (variables) -----*/
let board;

let x, y;
let player;
let firstDiag, secondDiag; 
let leftVert, midVert, rightVert; 
let topHoriz, midHoriz, botHoriz;
let diagCases, horizCases, vertCases, allCases, winner;
let numMoves;

/*----- cached element references -----*/
let cells = document.getElementsByClassName("cell");
let message = document.getElementById("message");
let resetBtn = document.getElementById("btn");

/*----- event listeners -----*/
Array.from(cells).forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener('click', resetRender);

/*----- Starts game -----*/
init();

/*----- functions -----*/
function init() {
    player = "X";
    winner = "";
    numMoves = 0;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
}

function handleClick(evt) {
    if (!evt.target.innerHTML && !winner) {
        numMoves++;
        [x,y] = [evt.target.id[0], evt.target.id[1]]
        board[x][y] = player;
        player = player == "X" ? "O" : "X";
        checkWin();
        render(evt, [x, y]);
    }
}

function render(evt, [x, y]) {
    evt.target.innerHTML = board[x][y];
    if (winner) {message.textContent = `Winner is ${winner}. Reset.`; return;}
    if (numMoves == 9 && !winner) {message.textContent = "Draw. No Winner! Reset."; return;}
    message.textContent = `Current player is ${player}`;
}

function checkWin() {
    allConditions();
    if (player === "O" && allCases) {
        winner = "X"
    } else if (player === "X" && allCases) {
        winner = "O"
    }
}

function allConditions() {
    firstDiag = generateCondition(board[0][0], board[1][1], board[2][2]);
    secondDiag = generateCondition(board[0][2], board[1][1], board[2][0]);
    leftVert = generateCondition(board[0][0], board[1][0], board[2][0]);
    midVert = generateCondition(board[0][1], board[1][1], board[2][1]);
    rightVert = generateCondition(board[0][2], board[1][2], board[2][2]);
    topHoriz = generateCondition(board[0][0], board[0][1], board[0][2]);
    midHoriz = generateCondition(board[1][0], board[1][1], board[1][2]);
    botHoriz = generateCondition(board[2][0], board[2][1], board[2][2]);
    diagCases = firstDiag || secondDiag;
    vertCases = leftVert || midVert || rightVert;
    horizCases = topHoriz || midHoriz || botHoriz;
    allCases = diagCases || vertCases || horizCases;
}

function generateCondition(a, b, c) {
    return a !== "" && (a === b && b === c);
}

function resetRender() {
    init();
    Array.from(cells).forEach(cell => cell.textContent = "");
    message.textContent = `Current player is ${player}`;
}