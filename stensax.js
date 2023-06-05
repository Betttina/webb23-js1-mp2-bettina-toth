// Hitta HTML-element
const nameInput = document.getElementById("name");
const nameInputLabel = document.getElementById("name-label"); //inmatningsrutan för spelarens namn
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("game");
const playerName = document.getElementById("playerName");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const rockButton = document.getElementById("rockButton");
const scissorsButton = document.getElementById("scissorsButton");
const paperButton = document.getElementById("paperButton");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("resultText");
const restartButton = document.getElementById("restartButton");

const nameForm = document.getElementById("nameForm");
const playerChoiceElement = document.getElementById("playerChoice");
const computerChoiceElement = document.getElementById("computerChoice");

// Spelvariabler
let name = "";
let playerPoints = 0;
let computerPoints = 0;

// Lyssna på formuläret för att starta spelet
nameForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Förhindra standardformulärinskickning
  name = nameInput.value;
  if (name) {
    playerName.textContent = name;
    showGameScreen();
  }
});

// Vad som visas och inte visas på skärmen
function showGameScreen() {
  nameInput.style.display = "none";
  nameInputLabel.style.display = "none";
  startButton.style.display = "none";
  gameContainer.style.display = "block";
  resultContainer.style.display = "none";
  restartButton.style.display = "none";
}

function showResultScreen(result) {
  resultText.textContent = result;
  resultContainer.style.display = "block";
}

function updateScores() {
  playerName.textContent = name;
  playerScore.textContent = playerPoints;
  computerScore.textContent = computerPoints;
}

function getRandomChoice() {
  const choices = ["rock", "scissors", "paper"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerChoice) {
  const computerChoice = getRandomChoice();

  let result;
  if (playerChoice === computerChoice) {
    result = "Oavgjort! 👀";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    result = "Du vinner rundan!";
    playerPoints++;
  } else {
    result = "Datorn vinner rundan!";
    computerPoints++;
  }

  updateScores();
  showResultScreen(result);

  if (playerPoints === 3 || computerPoints === 3) {
    let finalResult;
    if (playerPoints === 3) {
      finalResult = "Du vinner spelet! 🎉";
    } else {
      finalResult = "Datorn vinner spelet! 💻 ";
    }
    showResultScreen(finalResult);
    rockButton.disabled = true;
    scissorsButton.disabled = true;
    paperButton.disabled = true;
    restartButton.style.display = "block";
    computerChoiceElement.style.display = "none";
    playerChoiceElement.style.display = "none";
  } else {
    playerChoiceElement.textContent = `Spelare: ${playerChoice}`;
    computerChoiceElement.textContent = `Dator: ${computerChoice}`;
    playerChoiceElement.style.display = "block";
    computerChoiceElement.style.display = "block";
  }
}

// Lyssna på val av sten
rockButton.addEventListener("click", function () {
  playRound("rock");
});

// Lyssna på val av sax
scissorsButton.addEventListener("click", function () {
  playRound("scissors");
});

// Lyssna på val av påse
paperButton.addEventListener("click", function () {
  playRound("paper");
});

// Lyssna på starta om-knappen
restartButton.addEventListener("click", function () {
  playerPoints = 0;
  computerPoints = 0;
  updateScores();
  restartButton.style.display = "none";
  rockButton.disabled = false;
  scissorsButton.disabled = false;
  paperButton.disabled = false;
  showGameScreen();
});

function displayChoices(playerChoice, computerChoice) {
  playerChoiceElement.textContent = `Spelare: ${playerChoice}`;
  computerChoiceElement.textContent = `Dator: ${computerChoice}`;
  playerChoiceElement.style.display = "block";
  computerChoiceElement.style.display = "block";
}
