var x = true
var game_grid = document.getElementById('game_grid')

function movement(event) {
    let player_node = document.getElementById('player_node')

    if(event.keyCode == 87) player_node.textContent = 'up'      // pressed W
    if(event.keyCode == 83) player_node.textContent = 'down'    // pressed S
    if(event.keyCode == 65) player_node.textContent = 'left'    // pressed A
    if(event.keyCode == 68) player_node.textContent = 'right'   // pressed D
    if(event.keyCode == 27) x = false                           // pressed Escape
    console.log(event.keyCode, player_node.textContent)

    //event.preventDefault()
}


// Game loop
// Game actions during playthrough
document.addEventListener('keydown', movement)

