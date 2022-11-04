const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
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

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selectionName)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)
}

function addSelectionResult(selection, winner) {
    const imgId = selection.image
    const img = document.createElement('img')
    img.src = imgId
    const div = document.createElement('div')
    div.appendChild(img)
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name

}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}
