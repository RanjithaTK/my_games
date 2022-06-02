// document.addEventListener("DOMContentLoaded", () => {
$(document).ready(function () {
    // const gridDisplay = document.querySelector(".grid")
    const gridDisplay = $(".grid")[0]

    // const scoreDisplay = document.getElementById("score")
    // const scoreDisplay = $("#score")[0]
    // const resultDisplay = document.getElementById("result")

    // const restart = document.getElementById("reset")
    const width = 4
    let squares = []
    let score = 0
    $("#instruction").hide()
    // restart.addEventListener("click", reset)
    $("#reset").click(reset)             //#reset (id)=selector,click=>event,reset=>eventhandler

    function reset() {
        for (let i = 0; i < 16; i++) {
            squares[i].innerHTML = ""

        }

        generate()
        generate()
        checkForcolor()
        // scoreDisplay.innerHTML = 0 
        // document.getElementById("score").innerHTML = 0
        $("#score").text("0");
        score = 0;


        // resultDisplay.innerHTML = " "
        $("#result").text("")
        $("#instruction").hide()
        document.addEventListener("keyup", control)  
        

    }
    //createboard 4*4 
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            square = document.createElement('div')    //createelement =>function in document,div is the element to be constructed
            square.innerHTML = ""              //<div>""</div>
            gridDisplay.appendChild(square)   //puts 16 squares inside grid with ""
            squares.push(square)
        }
        generate()

        generate()
        
    }
    createBoard();

    // RANDOM GENERATION OF 2
    function generate() {
        let randomnumber = Math.floor(Math.random() * squares.length)
        if (squares[randomnumber].innerHTML == "") {
            squares[randomnumber].innerHTML = 2
            checkZero()


        } else {
            generate()

        }

    }

    // check game over or not
    function checkZero() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == "") {
                zeros++
            }
        }
        if (zeros === 0) {
            // resultDisplay.innerHTML = "You Lose..!"
            
            $("#result").text("You Lose ..!")
            
            document.removeEventListener("keyup", control)     //once lost game;event removed

        }
    }
    
    //check player wins or looses(wins if reached 2048)
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                // resultDisplay.innerHTML = "You Win..!"
                $("#result").text("You Win..!")
                document.removeEventListener("keyup", control)
            }
        }
    }
    $("#instruct").click(play)
    let Bool = false;
    function play(){
        Bool=!Bool  //true
        Bool?$("#instruction").show():$("#instruction").hide()    //ternary function
        
    }

    //swiping right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML   //"2"
                let totalTwo = squares[i + 1].innerHTML  //"0"
                let totalThree = squares[i + 2].innerHTML  //"2"
                let totalFour = squares[i + 3].innerHTML   //"0"
                //to change nos in the form of string to integers

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]//[2,0,2,0]
                let filteredRow = row.filter(num => num) //[2,2]

                let missing = 4 - filteredRow.length //2
                let zeros = Array(missing).fill("") //["",""]
                let newRow = zeros.concat(filteredRow) //["","",2,2]

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }
    //swiping Left 

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                //to change nos in the form of string to integers

                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)

                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill("")
                let newRow = (filteredRow).concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }
    //swipe Down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredCol = column.filter(num => num)
            let missing = 4 - filteredCol.length
            let zeros = Array(missing).fill("")
            let newColumn = zeros.concat(filteredCol)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]



        }
    }
    //swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredCol = column.filter(num => num)
            let missing = 4 - filteredCol.length
            let zeros = Array(missing).fill("")
            let newColumn = filteredCol.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]



        }
    }
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML && squares[i + 1].innerHTML && squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = ""
                score += combinedTotal
                // scoreDisplay.innerHTML = score
                $("#score").text(score)
            }
        }
        checkForWin()

    }
    function combinedCol() {             
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML && squares[i + width].innerHTML && squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = ""
                score += combinedTotal
                // scoreDisplay.innerHTML = score
                $("#score").text(score)

            }
        }
        checkForWin()
    }

    //controlling of keyboard
    function control(e) {
        if (e.key === "ArrowRight") {           //!!!!
            keyRight()
        } else if (e.key === "ArrowLeft") {
            keyLeft()
        }
        else if (e.key === "ArrowUp") {
            keyUp()
        }
        else if (e.key === "ArrowDown") {
            keyDown()
        }
    }
    document.addEventListener("keyup", control)           //keyup is event,control is eventhandler
    // $(document).keyup(control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
        checkForcolor()
    }
    function keyLeft() {              //[2,0,2,0]
        moveLeft()                      //[2,2,0,0]
        combineRow()                    //[0,4,0,0]
        moveLeft()                       //[4,0,0,0]
        generate()
        checkForcolor()
    }
    function keyDown() {
        moveDown()
        combinedCol()
        moveDown()
        generate()
        checkForcolor()
    }
    function keyUp() {
        moveUp()
        combinedCol()
        moveUp()                   
        generate()
        checkForcolor()
    }
    let colorValue = {
        "": "rgb(166, 179, 183)",
        2: "#33ff33",
        4: "#1affc6",
        8: " #33adff",
        16: " #a64dff",
        32: "#ff66ff",
        64: " #ff6699",
        128: " #ff8533",
        256: "#ffad33",
        512: " #ccff33",
        1024: "#ffff4d",
        2048: " #ffb3ff"
    }

    function checkForcolor() {
        for (let i = 0; i < squares.length; i++) {
            let num = squares[i].innerHTML
            // $(`.grid div:eq(${i})`).css("background-color",colorValue[num])
            $(`.grid div:eq(${i})`).animate({ "backgroundColor": colorValue[num] });
            $(`.grid div:eq(${i})`).hover(function(){
                $(this).css("background-color", "rgb(241, 247, 248)"); //(f1,f2})
                }, function(){
                $(this).css({ "backgroundColor": colorValue[num] });
              });
        
        }
    }
    checkForcolor()
   





})