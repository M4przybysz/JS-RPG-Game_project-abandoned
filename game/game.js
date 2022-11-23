var x = true
var game_grid = document.getElementById('game_grid')

const KEY_TO_ACTION = {
    'a' : 'left',
    'd' : 'right',
    's' : 'down',
    'w' : 'up'
}

function movement(event) {
    let player_node = document.getElementById('player_node')
    let key = event.key

    if(key == 'w') {               // pressed W
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">` 
    }
    if(key == 's') {               // pressed S
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'a') {               // pressed A
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'd') {               // pressed D
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_TO_ACTION[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'escape') {          // pressed Escape
        x = false  
    }     

    console.log(key, player_node.innerHTML)

    event.preventDefault()
}


// Game loop
// Game actions during playthrough
document.addEventListener('keydown', movement)

