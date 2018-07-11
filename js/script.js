'uste strict';

//Global params
var params = {
    userScore: 0,
    pcScore: 0,
    gameRounds: 0,
    progress: [],
};

// Icons&button
var startButton = document.getElementById('startgame'),
    rockIcon = document.getElementById('rock'),
    paperIcon = document.getElementById('paper'),
    scissorsIcon = document.getElementById('scissors'),

//Panels
    panel = document.getElementById('gamepanel'),
    game = document.getElementById('game'),
    rounds = document.getElementById('rounds'),
    result = document.getElementById('result'),
    output = document.getElementById('output');

//Game start

gamepanel.style.display = "none";

startButton.addEventListener('click', function() {startGame()});

var startGame = function () {
  resetParams()
    params.gameRounds = window.prompt("How many rounds would you like to play");
    if(params.gameRounds == "" || params.gameRounds <= 0 || isNaN(params.gameRounds)) {
      gamepanel.style.display = "none";
      output.innerHTML = "<strong>Please write correct number!</strong>";
    } else {
      // reset game
      params.userScore = 0;
      params.pcScore = 0;
      gamepanel.style.display = "inline";
      rounds.innerHTML = "You have: <strong>" + params.gameRounds + "</strong> rounds to win with smart PC!";
      result.innerHTML = "Gamer: <strong>" + params.userScore + "</strong> Smart PC: <strong>" + params.pcScore + "</strong><br><br>";
      gamepanel.style.display = "inline";
      output.innerHTML = "<strong>Choose your move and won!</strong><br>";
    }

};

function resetParams() {
  params.gameRounds = 0;
  params.userScore = 0;
  params.pcScore = 0;
  params.progress = [];
}


function tableCreate() {
  var modalTable = document.querySelector(".table");
  modalTable.innerHTML = "";
  modalTable.innerHTML = ""
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");


  for (var j = 0; j < params.progress.length; j++) {
    var row = document.createElement("tr");
    var tableProgress = params.progress[j];

    //////



    //////

    for (var key in tableProgress) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(tableProgress[key]);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  modalTable.appendChild(tbl);
  tbl.setAttribute("border", "2");
}


var showModal = function () {
  document.querySelector("#modal-overlay").classList.add("show");
  document.querySelector(".content").innerHTML =
    " Smart PC: " + params.pcScore + " Gamer: " + params.userScore;
  tableCreate();
};

var modalLinks = document.querySelectorAll(".show-modal");

var hideModal = function (event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

document.querySelector("#modal-overlay").addEventListener("click", hideModal);

var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

//Smart PC move

var computer = function() {
    var randomMove = Math.floor(Math.random() * 3 + 1);
    if(randomMove == 1) return "paper";
    else if(randomMove == 2) return "rock";
    else return "scissors";
};

//Gamer move

var moves = document.querySelectorAll('.player-move');
var playerMoveClassLength = moves.length;

for (var i = 0; i < playerMoveClassLength; i++) {
    moves[i].addEventListener('click', function() {
        gameResult(this.getAttribute('data-move'));
    });
}

//Won round

var whoWonRound = function(gamer, pcMove) {
    if ((gamer == "paper" && pcMove == "paper") || (gamer == "rock" && pcMove == "rock") ||(gamer == "scissors" && pcMove == "scissors")) return 'Nobody';
    else if ((gamer == "paper" && pcMove == "rock") || (gamer == "rock" && pcMove == "scissors") || (gamer == "scissors" && pcMove == "paper")){return 'Gamer';}
    else {return 'Smart PC';}
};

//Count

var count = function(won) {
    if(won == "Gamer") return params.userScore++;
    else if(won == "Smart PC") return params.pcScore++;
};

//Get result

var gameResult = function(gamerMove) {

    var pcMove = computer();
    var whoWon = whoWonRound(gamerMove, pcMove);
    var countWons = count(whoWon);

  params.progress.push({
        gameRoundsMod: params.gameRounds,
        gamePlayerMove: gamerMove,
        gameComputerMove: pcMove,
        finalResult: params.userScore + ' - ' + params.pcScore
});

    var resultContent = function() {
        result.innerHTML = "Player: <strong>" + params.userScore + "</strong> Smart PC: <strong>" + params.pcScore + "</strong><br><br>";
        result.style.display = "inline";
        gamepanel.style.display = "none";
        output.innerHTML = "Game Over!<br><strong>" + winner + " is the winner!</strong>";
    }
    if(params.gameRounds == params.userScore) {
      var winner = "Gamer";
      resultContent();
      //
      showModal();
    document.querySelector(".content").innerHTML +=
      "<br>Congratulations! Gamer won entire game" +
"<br>  Please press Let's Play! button";
      //
    } else if(params.gameRounds == params.pcScore) {
      var winner = "Smart PC";
      resultContent();
      //
      showModal();
    document.querySelector(".content").innerHTML +=
" <br>Sorry, Smart PC won entire game" + "<br>  Please press Let's Play! button";
      //
    } else {
      result.innerHTML = "Gamer: <strong>" + params.userScore + "</strong> Smart PC: <strong>" + params.pcScore + "</strong><br><br>";
      output.innerHTML = "Gamer played: <strong>" + gamerMove + "</strong>, Smart PC played: <strong>" + pcMove + "</strong>. || <strong>" + whoWon + "</strong> won round!<br>" + output.innerHTML;
    };
};
