let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let mesagge = document.querySelector("#message");
let title = document.querySelector(".title");
let play = document.querySelector("#reset");
let hard = document.querySelector("#hard");
let easy = document.querySelector("#easy");
let colors= [];
const GANASTE = "¡Correct!";
const PERDISTE = "Try Again";
const JUGARDENUEVO = "Play Again";
const PLAYAGAIN = "Change the colors";

//6--- Darle evento a los squares
let eventGame = (eventos) => {
  if (pickedColor === eventos.target.style.backgroundColor) {
    winGame(eventos.target.style.backgroundColor);
  } else {
    failGame();
    eventos.target.style.visibility = "hidden";
  }
};
//1 ---Cargar colores
//crear elegir color aletorio
let randomColor = () => {
  var numberColors = [];
  for (i = 0; i < 3; i++) {
    var indice = Math.floor(Math.random() * 256);
    numberColors.push(indice);
  }
  var stringNumber = numberColors.join(", ");
  let result = `rgb(${stringNumber})`;
  return result;
};
//crear colores aletorio de acuerdo a una cantidad
let generateRandomColors = (nivel) => {
  var colorsRandom = [];
  for (j = 0; j < nivel; j++) {
    colorsRandom.push(randomColor());
  }
  return colorsRandom;
};
//LISTA D COLORES
colors=generateRandomColors(6);
let newListOfColors=()=>{
  if (easy.classList.contains("selected")) {
    colors=[];
    colors = generateRandomColors(3);
    console.log("cantidad de colores: "+ colors.length)
  }
  if (hard.classList.contains("selected")) {
    colors=[];
    colors = generateRandomColors(6);
    console.log("cantidad de colores: "+ colors.length)
  }
}
//2---Pintar colores aletorios
//pinta los div --->1
for (i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", eventGame.bind(this));
}
//3---Elegir color ganador
let colorWinner = () => {
  var limite = colors.length;
  var indice = Math.floor(Math.random() * limite);
  return colors[indice];
};
let pickedColor = colorWinner();
//Cartel del texto ganador
colorDisplay.textContent = colorWinner();

//4--- Gana una partida
let winGame = (colorWin) => {
  mesagge.textContent = GANASTE;
  play.textContent = JUGARDENUEVO;
  title.style.backgroundColor=colorWin;
  changeColors(colorWin)
};

//5--- Equivocacion
let failGame = () => {
  play.textContent = PLAYAGAIN;
  mesagge.textContent = PERDISTE;
};

// 7---CAMBIAR LOS COLORES
let changeColors = (color) => {
  for (i = 0; i < colors.length; i++) {
    squares[i].style.visibility = "visible";
    squares[i].style.backgroundColor = color;
  }
};

//8--- Resetear juego
let resetGame=()=>{
  colorDisplay.textContent = colorWinner();
  mesagge.textContent = "";
  title.style.backgroundColor = "";
  pickedColor = colorWinner();
}

let playAgain = () => {
  newListOfColors();
  resetGame(); 
  for(i=0;i<squares.length;i++){
    squares[i].style.visibility = "hidden";
  }
  for (i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.visibility = "visible";
    squares[i].addEventListener("click", eventGame.bind(this));
  }
};

play.addEventListener("click", playAgain);
hard.addEventListener("click", function () {
  console.log(this.classList.contains("selected"));
  console.log("easy");
  console.log(easy.classList.contains("selected"));
  if( mesagge.textContent === GANASTE){
    playAgain();
  }
  if (!this.classList.contains("selected")) {
    this.classList.toggle("selected");
    easy.classList.toggle("selected");
    playAgain();
  }
});

easy.addEventListener("click", function () {
  console.log(this.classList.contains("selected"));
  if( mesagge.textContent === GANASTE){
    playAgain();
  }
  if (!this.classList.contains("selected")) {
    hard.classList.toggle("selected");
    this.classList.toggle("selected");
    playAgain();
  }
});
