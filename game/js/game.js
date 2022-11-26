//* This file runs is a game loop

//TODO: Put game actions to do on load ===============================================================
window.onload = () => {
    Grid.loadGrid()
}

//TODO: Put game actions during playthrough ==========================================================
let start_time = Date.now()

document.addEventListener('keydown', keydownActions)

//? First Esc press does not activate its action when game_stop display is set to 'none' so I force Esc press
// document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))

setInterval(()=>{
    let game_grid = document.getElementById('game_grid')
    let player_node = null
    if(game_grid.innerHTML != '') { 
        player_node = document.getElementById('player_node')
    }

    let current_time = Date.now()

    if((current_time - start_time) % 200 == 0) {
        if(player_node != null && active_wsad_key != null) {
            player_node.innerHTML = `<img src="assets/test_arrows/arrow_${KEY_MAP[active_wsad_key]}.png" alt="Sorry. There is no arrow.">`
            active_wsad_key = null
        }
    }
},1)