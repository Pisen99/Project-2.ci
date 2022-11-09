const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const SELECTIONS = [
    {
        name: 'rock',
        image: './assets/images/rock.png',
        beats: 'scissor'
    },
    {
        name: 'paper',
        image: './assets/images/paper.png',
        beats: 'rock'
    },
    {
        name: 'scissor',
        image: './assets/images/scissor.png',
        beats: 'paper'
    }
]

// Finds the name of the selections and makes the selection on a click
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
})

// Added score board functionality 1 or 0 points if you win or lose. Computers selections will randomize.
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);
    addSelectionResult(computerSelection, 'computer');
    addSelectionResult(playerSelection, 'player');
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

/* Show the caracter that a particular user just played
@param {string} selection - One of 'rock', 'paper' or 'scissor'
@param {string} player - One of 'computer' or 'player'
*/
function addSelectionResult(selection, player) {

    const previousResultDivs = document.querySelectorAll(
        `.result-selection.${player}`
    )
    
    for (d of previousResultDivs) {
        d.remove()
    }

    const imgId = selection.image;
    const img = document.createElement('img');
    img.src = imgId;
    const div = document.createElement('div');
    div.appendChild(img);
    div.classList.add('result-selection');
    div.classList.add(player);
    
    finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;

}

// Creates the function for the computer to make a random choice.
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

// Reset button
function resetGame() {
    yourScoreSpan.innerText = 0;
    computerScoreSpan.innerText = 0;
    const clears = document.querySelectorAll('.result-selection');
    clears.forEach(clear => {
        clear.remove();
    })
}

// Rules button
const rulesPopUp = document.getElementById('rules-container');

function popupContainer() {
    rulesPopUp.style.visibility = 'visible';
}

function popupContainerClose() {
    rulesPopUp.style.visibility = 'hidden';
}

// Alert when game is over
