var active_wsad_key = null

const KEY_DICT = {
    'A' : 'left',
    'D' : 'right',
    'S' : 'down',
    'W' : 'up'
}

function keydownActions(event) {
    let key = event.key.toUpperCase()

    if(key == 'ESCAPE' && isFirstRun != true) { // pressed Escape
        pauseOrUnpauseGame()
    }

    // Pressed WSAD
    if((key == 'W' || key == 'S' || key == 'A' || key == 'D') && game_pause.style.display == 'none') { 
        active_wsad_key = key
    }

    // Pressed E (action key)
    if(key == 'E' && game_pause.style.display == 'none') {
        // Pick up an item
        if(Grid.items_map[Player.position_y][Player.position_x] != null) { itemPickUp(0, 0) }
        else if(Grid.items_map[Player.position_y - 1][Player.position_x] != null && Player.direction == 'W') { itemPickUp(0, -1) }
        else if(Grid.items_map[Player.position_y + 1][Player.position_x] != null && Player.direction == 'S') { itemPickUp(0, 1) }
        else if(Grid.items_map[Player.position_y][Player.position_x - 1] != null && Player.direction == 'A') { itemPickUp(-1, 0) }
        else if(Grid.items_map[Player.position_y][Player.position_x + 1] != null && Player.direction == 'D') { itemPickUp(1, 0) }

        //TODO: Add other 'E' functions
    }

    
}
