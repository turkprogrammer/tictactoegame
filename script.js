    // Cache DOM selectors
    const squares = document.querySelectorAll(".square");
    const status = document.querySelector("#game-status");
    const restart = document.querySelector("#restart-button");

    // Initialize game state variables
    let currentPlayer = "X";
    let gameActive = true;

    const gameStats = {
        totalGames: 0,
        xWins: 0,
        oWins: 0,
        xLosses: 0,
        oLosses: 0,
        totalTies: 0,
        xTies: 0,
        oTies: 0,

        updateStats(player) {
            if (player === 'X') {
                this.xWins++;
                this.oLosses++;
            } else if (player === 'O') {
                this.oWins++;
                this.xLosses++;
            } else if (player === 'tie') {
                this.totalTies++;
            }
            this.renderStats();
        },

        renderStats() {
            const xWinsElement = document.querySelector('#x-wins');
            const oWinsElement = document.querySelector('#o-wins');
            const xTiesElement = document.querySelector('#x-ties');
            const oTiesElement = document.querySelector('#o-ties');
            const xLossesElement = document.querySelector('#x-losses');
            const oLossesElement = document.querySelector('#o-losses');
            const totalTiesElement = document.querySelector('#total-ties');
            xWinsElement.textContent = this.xWins;
            oWinsElement.textContent = this.oWins;
            xTiesElement.textContent = this.xTies;
            oTiesElement.textContent = this.oTies;
            xLossesElement.textContent = this.xLosses;
            oLossesElement.textContent = this.oLosses;
            totalTiesElement.textContent = this.totalTies;
        }
    };

    // Handle square click event
    function handleSquareClick(e) {
        const square = e.target;
        if (!gameActive || square.textContent !== "") {
            return;
        }
        square.textContent = currentPlayer;
        switchPlayer();
        checkForWin();
    }

    // Check for a win or tie
    function checkForWin() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winningConditions) {
            if (
                squares[condition[0]].textContent === currentPlayer &&
                squares[condition[1]].textContent === currentPlayer &&
                squares[condition[2]].textContent === currentPlayer
            ) {
                // Add "win" class to the winning squares
                for (let index of condition) {
                    squares[index].classList.add("win-over");
                }
                status.classList.add("win");
                status.textContent = `Player ${currentPlayer} has won!`;
                gameActive = false;
                // Update game stats
                gameStats.updateStats(currentPlayer);
                return;
            }
        }

        // Check for tie
        let tie = true;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].textContent.trim() === "") {
                tie = false;
                break;
            }
        }
        if (tie) {
            status.textContent = "It's a tie!";
            gameActive = false;
            // Update game stats
            gameStats.totalTies++;
            if (currentPlayer === 'X') {
                gameStats.xTies++;
            } else {
                gameStats.oTies++;
            }
            gameStats.renderStats();
            return;
        }

        // Update game status message
        status.classList.remove("win", "tie");
        if (gameActive) {
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Switch player
    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Handle restart button click event
    function handleRestartClick() {
        // Reset game state variables
        currentPlayer = "X";
        gameActive = true;

        // Clear board and remove classes
        squares.forEach((square) => {
            square.textContent = "";
            square.classList.remove("win-over");
        });

        // Reset game status message
        status.textContent = `Player ${currentPlayer}'s turn`;
        status.classList.remove("win", "tie");
    }

    // Add event listeners
    squares.forEach((square) => {
        square.addEventListener("click", handleSquareClick);
    });

    restart.addEventListener("click", handleRestartClick);