//* This file runs is a game loop
//TODO Put game actions during playthrough

window.onload = () => {
    Grid.loadGrid()
}

document.addEventListener('keydown', keyAction)
document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'})) // First Esc press does not activate its action so I force Esc press (▀̿Ĺ̯▀̿ ̿)

