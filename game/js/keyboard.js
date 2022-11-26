const KEY_MAP = {
    'A' : 'left',
    'D' : 'right',
    'S' : 'down',
    'W' : 'up'
}

function keyAction(event) {
    let game_grid = document.getElementById('game_grid')
    let player_node = null
    let stop = document.getElementById('game_stop')
    let key = event.key.toUpperCase()

    if(game_grid.innerHTML != '') { 
        player_node = document.getElementById('player_node')
    }

    if(key == 'ESCAPE') {           // pressed Escape
        if(stop.style.display == 'none') {
            stop.style.display = 'block'  
        }
        else {
            stop.style.display = 'none'
        }
    }

    if(stop.style.display == 'none') {
        if((key == 'W' || key == 'S' || key == 'A' || key == 'D')&&(player_node != null)) {                // pressed WSAD
            player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">` 
        }
    }    

    console.log(key)

    //event.preventDefault()
}