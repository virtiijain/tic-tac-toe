
        let board = Array(9).fill(null);
        let currentPlayer = 'X';
        let againstAI = false;
        let scores = { X: 0, O: 0 };
        const boardEl = document.getElementById('board');
        const statusEl = document.getElementById('status');
        const scoreXEl = document.getElementById('scoreX');
        const scoreOEl = document.getElementById('scoreO');
        const overlayEl = document.getElementById('overlay');

        function createBoard() {
            boardEl.innerHTML = '';
            board.forEach((_, i) => {
                const cell = document.createElement('div');
                cell.classList.add('w-20', 'h-20', 'flex', 'items-center', 'justify-center', 'text-3xl', 'font-bold', 'bg-gray-900', 'border', 'border-gray-300', 'cursor-pointer', 'rounded-md');
                cell.addEventListener('click', () => makeMove(i));
                boardEl.appendChild(cell);
            });
        }

        function makeMove(index) {
            if (board[index] || checkWinner()) return;
            board[index] = currentPlayer;
            updateBoard();
            if (checkWinner()) {
                scores[currentPlayer]++;
                updateScores();
                showWinMessage(`${currentPlayer} Wins! 🎉`);
                return;
            }
            if (board.every(cell => cell !== null)) {
                showWinMessage("It's a Tie! 🤝");
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusEl.textContent = `Player ${currentPlayer}'s turn`;
            if (againstAI && currentPlayer === 'O') setTimeout(aiMove, 500);
        }

        function aiMove() {
            let emptyCells = board.map((val, i) => (val === null ? i : null)).filter(v => v !== null);
            let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            makeMove(randomMove);
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const pattern of winPatterns) {
                if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]) {
                    pattern.forEach(i => boardEl.children[i].classList.add('win-cell'));
                    return true;
                }
            }
            return false;
        }

        function updateBoard() {
            board.forEach((val, i) => {
                boardEl.children[i].textContent = val;
            });
        }

        function updateScores() {
            scoreXEl.textContent = scores.X;
            scoreOEl.textContent = scores.O;
        }

        function showWinMessage(message) {
            overlayEl.textContent = `🎉 ${message}`;
            overlayEl.style.display = 'flex';
            confetti();
            setTimeout(() => {
                overlayEl.style.display = 'none';
                resetGame();
            }, 2000);
        }

        function resetGame() {
            board = Array(9).fill(null);
            currentPlayer = 'X';
            statusEl.textContent = `Player ${currentPlayer}'s turn`;
            createBoard();
        }

        function resetScores() {
            scores = { X: 0, O: 0 };
            updateScores();
        }

        function toggleMode() {
            againstAI = !againstAI;
            resetGame();
        }

        document.getElementById('ai-toggle').addEventListener('click', toggleMode);
        document.getElementById('reset-game').addEventListener('click', resetGame);
        document.getElementById('reset-scores').addEventListener('click', resetScores);

        createBoard();
