const player ="x"
const computer ="O"
let board_full = false;
var play_board = ["","","","","","","","",""];
const board_container = document.getElementById("play-area");
addplayermove = () => {
}
const render_board = () =>{
    board_container.innerHTML = "";
    play_board.forEach((val, index) => {
        board_container.innerHTML += `<div id="block_${index}" class="block" onclick="addplayerMove(${index})">${play_board[index]}</div>`;
       if(val ==="x"|| val ==="O") 
       {
           document.querySelector(`#block_${index}`).classList.add("occupied");
       }
    });
}
const addplayerMove = index => {
    if (!board_full && play_board[index] === ""){
    play_board[index] = player;
   game_function();
    addcomputermove();}
};
const addcomputermove = () => {
  if (!board_full){
    let selected;
     do {
         selected = Math.floor(Math.random() * 9);
      } while (play_board[selected] !="");
      play_board[selected] = computer;
      game_function();
  }
};
const check_board_complete = function() {
    let flag = false;
    play_board.forEach(value => {
       if (value === "") {
        flag = true;
     }
    }); 
    board_full = !flag;
};
const game_function = () =>{
    render_board ();
    check_board_complete();
    check_for_winner();
}
const check_line = (posA, posB, posC) => {
    if ( play_board[posA] !==""){
        return ((play_board[posA] === play_board[posB]) &&
        (play_board[posB] === play_board[posC])
        );
    }
    return false;
}
const winner_stament = document.getElementById("winner")
const check_for_winner = () => {
    let result = check_match();
    if (result === player) {
        winner_stament.innerText = "Player Wins!"
        winner_stament.classList.add("PlayerWins");
        board_full = true
    }
    else if (result === computer) {
        winner_stament.innerText = "Computer Wins!"
        winner_stament.classList.add("ComputerWins");
        board_full = true
    }
    else if (board_full) {
        winner_stament.innerText = "Draw";
        winner_stament.classList.add("draw");
    }
};
 const check_match = () => {
     for (let index = 0; index < 9; index+= 3) {
         if (check_line(index, index + 1, index + 2)) {
            return play_board [index];
         }
     }
     for (let index = 0; index < 3; index++)
    if (check_line(index, index + 3, index + 6)) {
        return play_board[index];
    }
    if (check_line(0, 4, 8)){
        return play_board [0];
    }
    if (check_line(2, 4, 6)){
        return play_board [2];
    }
    return"";
};
const reset_board = () => {
    play_board = ["","","","","","","","",""];
    board_full = false;
    winner_stament.innerText = "";
    winner_stament.classList.remove("PlayerWins", "Computerwins", "draw");
    render_board(); 
}
render_board(); 