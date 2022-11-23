var x = true
var game_grid = document.getElementById('game_grid')

const CODE_TO_KEY = {
    27 : 'ESCAPE',
    65 : 'A',
    68 : 'D',
    83 : 'S',
    87 : 'W'
}

const KEY_TO_ACTION = {
    'A' : 'left',
    'D' : 'right',
    'S' : 'down',
    'W' : 'up'
}

function movement(event) {
    let player_node = document.getElementById('player_node')
    let key = event.key.toUpperCase()

    if(key == 'W') {               // pressed W
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">` 
    }
    if(key == 'S') {               // pressed S
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'A') {               // pressed A
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'D') {               // pressed D
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'ESCAPE') {          // pressed Escape
        x = false  
    }     

    console.log(key, player_node.innerHTML)

    event.preventDefault()
}


// Game loop
// Game actions during playthrough
document.addEventListener('keydown', movement)

