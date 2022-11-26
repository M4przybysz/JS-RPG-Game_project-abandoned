//* This file runs is a game loop

window.onload = () => {
    Grid.loadGrid()
}

//TODO Put game actions during playthrough
document.addEventListener('keydown', keyAction)

//? First Esc press does not activate its action when game_stop display is set to 'none' so I force Esc press
//? document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))

