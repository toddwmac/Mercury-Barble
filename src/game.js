const words = ["CRANE", "APPLE"];  // Add more 5-letter words as needed
const targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
let currentRow = 0;
let currentCol = 0;
let selectedLetters = [];

document.getElementById('submit-guess').addEventListener('click', submitGuess);
document.getElementById('backspace').addEventListener('click', backspace);

function createBoard() {
    const board = document.getElementById('game-board');
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
        }
    }
}

function updateCell(row, col, value, color) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.textContent = value;
    if (color) {
        cell.style.backgroundColor = color;
    }
}

function updateSelectedLetters() {
    // Clear current row first
    for (let i = 0; i < 5; i++) {
        updateCell(currentRow, i, '', null);
    }
    
    // Update current row with selected letters
    for (let i = 0; i < selectedLetters.length; i++) {
        updateCell(currentRow, i, selectedLetters[i], null);
    }
}

function submitGuess() {
    if (selectedLetters.length !== 5) {
        document.getElementById('message').textContent = 'Please select 5 letters';
        return;
    }

    const guess = selectedLetters.join('');
    const feedback = getFeedback(guess, targetWord);
    
    // Update current row with colors
    for (let i = 0; i < 5; i++) {
        updateCell(currentRow, i, guess[i], feedback[i]);
        updateKeyColor(guess[i], feedback[i]);
    }

    if (guess === targetWord) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
        disableInput();
    } else {
        currentRow++;
        if (currentRow >= 6) {
            document.getElementById('message').textContent = `Game over! The word was ${targetWord}.`;
            disableInput();
        } else {
            selectedLetters = [];
            document.getElementById('submit-guess').disabled = true;
            // Clear next row for new guess
            for (let i = 0; i < 5; i++) {
                updateCell(currentRow, i, '', null);
            }
        }
    }
}

function getFeedback(guess, target) {
    let feedback = new Array(5).fill('');
    let targetArray = target.split('');
    let guessArray = guess.split('');

    // First pass: mark greens
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === targetArray[i]) {
            feedback[i] = 'green';
            targetArray[i] = null;
            guessArray[i] = null;
        }
    }

    // Second pass: mark yellows and grays
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) {
            const index = targetArray.indexOf(guessArray[i]);
            if (index !== -1) {
                feedback[i] = 'yellow';
                targetArray[index] = null;
            } else {
                feedback[i] = 'gray';
            }
        }
    }

    return feedback;
}

function updateKeyColor(letter, color) {
    const key = document.getElementById(`key-${letter}`);
    key.classList.add(color);
}

function disableInput() {
    document.querySelectorAll('.key').forEach(key => key.disabled = true);
    document.getElementById('submit-guess').disabled = true;
    document.getElementById('backspace').disabled = true;
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const keyboardLayout = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';
            keyElement.id = `key-${key}`;
            keyElement.textContent = key;
            keyElement.addEventListener('click', () => selectLetter(key));
            rowDiv.appendChild(keyElement);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

function selectLetter(letter) {
    if (selectedLetters.length < 5) {
        selectedLetters.push(letter);
        updateCell(currentRow, selectedLetters.length - 1, letter, null);
        if (selectedLetters.length === 5) {
            document.getElementById('submit-guess').disabled = false;
        }
    }
}

function backspace() {
    if (selectedLetters.length > 0) {
        selectedLetters.pop();
        updateSelectedLetters();
        document.getElementById('submit-guess').disabled = true;
    }
}

// Initialize the game
createBoard();
createKeyboard();
document.getElementById('submit-guess').disabled = true;
document.getElementById('mystery-word').textContent = targetWord;
