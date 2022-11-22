var x = true
var game_grid = document.getElementById('game_grid')

const CODE_TO_KEY = {
    27 : 'escape',
    65 : 'left',
    68 : 'right',
    83 : 'down',
    87 : 'up'
}

function movement(event) {
    let player_node = document.getElementById('player_node')

    if(event.keyCode == 87) {               // pressed W
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${CODE_TO_KEY[event.keyCode]}.png" alt="Sorry. There is no arrow.">` 
    }
    if(event.keyCode == 83) {               // pressed S
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${CODE_TO_KEY[event.keyCode]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(event.keyCode == 65) {               // pressed A
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${CODE_TO_KEY[event.keyCode]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(event.keyCode == 68) {               // pressed D
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${CODE_TO_KEY[event.keyCode]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(event.keyCode == 27) x = false       // pressed Escape

    console.log(event.keyCode, player_node.textContent)

    //event.preventDefault()
}


// Game loop
// Game actions during playthrough
document.addEventListener('keydown', movement)

