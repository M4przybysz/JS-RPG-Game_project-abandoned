//* This file runs is a game loop

//TODO: Put game actions to do on load ==========================================================================================
window.onload = () => {
    Grid.loadGrid()
}

//TODO: Define html game components =============================================================================================
var game_grid = Grid.grid
var player_node = null
if(game_grid.innerHTML != '') { 
    player_node = document.getElementById('player_node')
}

//TODO: Put game actions during playthrough =====================================================================================
document.addEventListener('keydown', keydownActions)

//? First Esc press does not activate its action when game_stop display is set to 'none' so I force Esc press
// document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))

//* Game ticks handler
var interval = 300; // Interval in milliseconds
var expected_time_diff = Date.now() + interval; // Expected time difference between interval and now in milliseconds

function gameTicks() {
    var time_diff = Date.now() - expected_time_diff; // Get actual time difference

    if (time_diff > interval) { // Error handler
        console.error('Time difference error: ', time_diff, '>', interval)
    }

    //TODO: Put game events that need to run in intervals here ==================================================================
    Grid.moveGrid(active_wsad_key)
    timer()

    // Start next loop
    expected_time_diff += interval;
    setTimeout(gameTicks, interval - time_diff);

    return 1
}

//* Start game loop
gameTicks()