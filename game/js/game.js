//* This file runs is a game loop

//TODO: Define global html game components ======================================================================================
var game_grid = Grid.grid
var player_node = null
if(game_grid.innerHTML != '') { 
    player_node = document.getElementById('player_node')
}

//TODO: Put game actions to do on load ==========================================================================================
window.onload = () => {

    Grid.importLocation(Player.location)
    gameGridTicks() // First game ticks loop start
}

//TODO: Put game functions during playthrough ===================================================================================
function pauseOrUnpauseGame(hardpause) {
    let game_pause = document.getElementById('game_pause')
    if(game_pause.style.display === 'none' || hardpause === true) {
        game_pause.style.display = 'block'  
    }
    else {
        game_pause.style.display = 'none'
    }
}

// Game ticks handler 
var interval = 250; // Interval in milliseconds
var expected_time_diff = Date.now() + interval; // Expected time difference between interval and now in milliseconds
var time_diff

function gameGridTicks() {
    time_diff = Date.now() - expected_time_diff; // Get actual time difference

    if(time_diff > interval || document.visibilityState === 'hidden') {return -1} // Time error handling. Errors occur when game tab is not visible to the user

    //TODO: Put game events that need to run in intervals here ==================================================================
    Grid.moveGrid(active_wsad_key)
    timer()

    
    

    // Start next loop ==================================
    expected_time_diff += interval;
    setTimeout(gameGridTicks, interval - time_diff)
}

//TODO: Put game loops and event listeners here =================================================================================
document.addEventListener('keydown', keydownActions)


document.onvisibilitychange = () => {
    if(document.visibilityState === 'visible') { // Restart gameGridTicks() every time user is back on the site
        expected_time_diff = Date.now() + interval 
        gameGridTicks()
    }
    if(document.visibilityState === 'hidden') { // Puse game when user is not on the site
        pauseOrUnpauseGame(true)
    }
}