const KEY_MAP = {
    'A' : 'left',
    'D' : 'right',
    'S' : 'down',
    'W' : 'up'
}

function keyAction(event) {
    let player_node = document.getElementById('player_node')
    let stop = document.getElementById('game_stop')
    let key = event.key.toUpperCase()

    if(key == 'W') {                // pressed W
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">` 
    }
    if(key == 'S') {                // pressed S
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'A') {                // pressed A
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'D') {                // pressed D
        player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">`
    }   
    if(key == 'ESCAPE') {           // pressed Escape
        if(stop.style.display == 'none') {
            stop.style.display = 'block'  
        }
        else {
            stop.style.display = 'none'
        }
    }     

    console.log(key, player_node.innerHTML)

    event.preventDefault()
}