/*----- app's state (variables) -----*/
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let x, y;
let player = "X";

/*----- constants -----*/
const firstDiag = board[1][1] != "" && (board[0][0] == board[1][1] && board[1][1] == board[2][2]);
const secondDiag = board[1][1] != "" && (board[0][2] == board[1][1] && board[1][1] == board[2][0]);

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
        console.log(player);
        console.log(board);
        checkWin();
    }
}

function render(evt, [x, y]) {
    evt.target.innerHTML = board[x][y];
}

function checkWin() {
    if (player && (firstDiag || secondDiag)) {
        console.log("Winner is", player)
    }
}