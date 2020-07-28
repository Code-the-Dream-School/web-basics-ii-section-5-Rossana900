//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board
//for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player
//is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is
//then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining
//boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are
//representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is
//a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' ,
//'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'.
//the reset button has to start the game again and the new game create a new game with new players and a new random board.

//asking the players for the names using prompt
const namePlayer1 = document.getElementById("name_player1");
const namePlayer2 = document.getElementById("name_player2");

// name_player1.textContent = prompt("You are Player 1, What is your name?");
// name_player2.textContent = prompt("You are Player 2, What is your name?");

//defining objets to store player information
let player1 = {
  name: (name_player1.textContent = prompt(
    "You are Player 1, What is your name?"
  )),
  shipCount: 0,
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

let player2 = {
  name: (name_player2.textContent = prompt(
    "You are Player 2, What is your name?"
  )),
  shipCount: 0,
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const board_Player1 = document.getElementById("board_player1");
const board_Player2 = document.getElementById("board_player2");
const livesPlayer1 = document.getElementById("ships_player1");
livesPlayer1.textContent = 4;
const livesPlayer2 = document.getElementById("ships_player2");
livesPlayer2.textContent = 4;
const ships_player1 = document.getElementById("ships_player1");
const ships_player2 = document.getElementById("ships_player2");
const turn_player = document.getElementById("turn_player");
const button = document.getElementById("buttons");
//this displays the turn to play
// turn_player.textContent = player2.name;
let activeBoard = "board_Player1";

// let firstBoard;
function boardBuilt(player) {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement("li"); // creating childs for the list (board),
    //in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement("div");
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'
      cell.value = player.board[x][y]; //state of the cell
      //I changed the code above

      //function to add the ships
      // function placeShip(player) {
      //   let x = Math.floor(Math.random() * 4);
      //   let y = Math.floor(Math.random() * 4);
      // if (player.gameBoard[x][y] === 1) {
      //     return
      // } else {
      //   console.log(x,y);

      //   player.gameBoard[x][y]= 1;
      //   player.shipCount++;
      // }

      //placeShip(player);

      //this function adds the click event to each cell

      cell.addEventListener("click", (e) => {
        let cell = e.target; // get the element clicked
        console.log(cell.textContent); //display the coordinates in the console
        let playerClassName = cell.parentNode.parentNode.className; //className of clicked element

        function switchPlayers() {
          if (activeBoard === "board_player1") {
            activeBoard = "board_player2";
            turnNow.textContent = player1.name;
          } else if (activeBoard === "board_player2") {
            activeBoard = "board_player1";
            turnNow.textContent = player2.name;
          }
        }
        if (cell.value === 0 && activeBoard === playerClassName) {
          cell.style.visibility = "hidden"; // this  means that the contents of the element will be invisible,
          //but the element stays in its original position and size / try it clicking on any of the black cells
          //(in your browser) and see whats happens
          switchPlayers();
        } else if (cell.value === 1 && activeBoard === playerClassName) {
          cell.style.background = "purple"; //with this propertie you can change the background color of the
          //clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file
          //and refresh the browser to see the changes
          cell.value = 3;
          player.ships--;
          ships_player1.textContent = player1.ships; // this may display lives after turns
          ships_player2.textContent = player2.ships;

          if (player.ships === 0) {
            if (player === player1) gameOver(player2);
            else gameOver(player1);
          }
        }
      });

      li.appendChild(cell); //adding each cell into the row number x
    }
    if (player === player1) {
      board_Player1.appendChild(li); //adding each row into the board
    } else {
      board_Player2.appendChild(li);
    }
  }
}
boardBuilt(player1);
boardBuilt(player2);

// function boardBuilt(secondBoard) {
//   for (var x = 0; x < 4; x++) {
//     const li = document.createElement("li");
//     // creating childs for the list (board), in this case represent a row number 'x' of the board
//     for (var y = 0; y < 4; y++) {
//       const cell = document.createElement("div");
//       cell.className = "square"; // adding css properties to make it looks like a square
//       cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'
//       cell.value = 0; //player.board[x][y]; //state of the cell
//       //this function adds the click event to each cell
//       cell.addEventListener("click", (e) => {
//         let cell = e.target; // get the element clicked
//         console.log(cell.textContent); //display the coordinates in the console
//         let playerClassName = cell.parentNode.parentNode.className;
//         function switchPlayers() {
//           if (activeBoard === "board_player2") {
//             activeBoard = "board_player1";
//             turnNow.textContent = player2.name;
//           } else if (activeBoard === "board_player1") {
//             activeBoard = "board_player2";
//             turnNow.textContent = player1.name;
//           }
//         }
//         if (cell.value === 0 && activeBoard === playerClassName) {
//           cell.style.visibility = "hidden"; // this  means that the contents of the element will be invisible,
//           //but the element stays in its original position and size / try it clicking on any of the black cells
//           //(in your browser) and see whats happens
//           switchPlayers();
//         } else if (cell.value === 1 && activeBoard === playerClassName) {
//           cell.style.background = "purple"; //with this propertie you can change the background color of the
//           //clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file
//           //and refresh the borwser to see the changes
//           cell.value = 3;
//           player.ships--;
//           ships_player1.textContent = player1.ships;
//           ships_player2.textContent = player2.ships;
//           if (player.ships === 0) {
//             if (player === player2) gameOver(player1);
//             else gameOver(player2);
//           }
//         }
//       });
//     }
//     li.appendChild(cell); //adding each cell into the row number x
//   }

//   secondBoard.appendChild(li); //adding each row into the board
// }

// boardBuilt();
