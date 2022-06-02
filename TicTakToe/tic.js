const PlayerDiv = document.querySelector(".player")
const resetDiv = document.querySelector(".reset")
const cellDivs = document.querySelectorAll(".box")

//Game constants

const firstPlayer = "X"
const secondPlayer = "O"

//Game variables

let GameOn = true
let xIsNext = true

//functions

const letterToSymbol = (letter) => (letter === "X" ? firstPlayer : secondPlayer)

//display which player wins

const GameWin = (letter) => {
  GameOn = false
  if (letter === "X") {
    PlayerDiv.innerHTML = `${letterToSymbol(letter)} won...!`
  } else {
    PlayerDiv.innerHTML = `<span>${letterToSymbol(letter)} won...!</span>`
  }
}

//checks the sts of game who wins ,position

const GameStatus = () => {
  const square1 = cellDivs[0].classList[1]
  const square2 = cellDivs[1].classList[1]
  const square3 = cellDivs[2].classList[1]
  const square4 = cellDivs[3].classList[1]
  const square5 = cellDivs[4].classList[1]
  const square6 = cellDivs[5].classList[1]
  const square7 = cellDivs[6].classList[1]
  const square8 = cellDivs[7].classList[1]
  const square9 = cellDivs[8].classList[1]

  //check winner

  if (square1 && square1 === square2 && square1 === square3) {
    GameWin(square1)
    cellDivs[0].classList.add("won")
    cellDivs[1].classList.add("won")
    cellDivs[2].classList.add("won")
  } else if (square4 && square4 === square5 && square4 === square6) {
    GameWin(square4)
    cellDivs[3].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[5].classList.add("won")
  } else if (square7 && square7 === square8 && square7 === square9) {
    GameWin(square7)
    cellDivs[6].classList.add("won")
    cellDivs[7].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (square1 && square1 === square4 && square1 === square7) {
    GameWin(square1)
    cellDivs[0].classList.add("won")
    cellDivs[3].classList.add("won")
    cellDivs[6].classList.add("won")
  } else if (square2 && square2 === square5 && square2 === square5) {
    GameWin(square2)
    cellDivs[1].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[7].classList.add("won")
  } else if (square3 && square3 === square6 && square3 === square9) {
    GameWin(square3)
    cellDivs[2].classList.add("won")
    cellDivs[5].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (square1 && square1 === square5 && square1 === square9) {
    GameWin(square1)
    cellDivs[0].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (square3 && square3 === square5 && square3 === square7) {
    GameWin(square3)
    cellDivs[2].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[6].classList.add("won")
  } else if (
    square1 &&
    square2 &&
    square3 &&
    sqaure4 &&
    square5 &&
    sqaure6 &&
    square7 &&
    square8 &&
    square9
  ) {
    GameOn = false
    PlayerDiv.innerHTML = "Game Tied!!"
  } else {
    xIsNext = !xIsNext
    if (xIsNext) {
      PlayerDiv.innerHTML = `${firstPlayer}'s Turn`
    } else {
      PlayerDiv.innerHTML = `<span>${secondPlayer}'s Turn</span>`
    }
  }
}

// to set reset btn

const ResetCheck = () => {
  xIsNext = true
  PlayerDiv.innerHTML = `${firstPlayer}'s Turn`
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("X")
    cellDiv.classList.remove("O")
    cellDiv.classList.remove("won")
  }
  GameOn = true
}

const cellClick = (e) => {
  const classList = e.target.classList
  if (!GameOn || classList[1] === "X" || classList[1] === "O") {
    return
  }
  if (xIsNext) {
    classList.add("X")
    GameStatus()
  } else {
    classList.add("O")
    GameStatus()
  }
}

//event listeners

resetDiv.addEventListener("click", ResetCheck)
for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", cellClick)
}
