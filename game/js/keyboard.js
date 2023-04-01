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

    // pressed WSAD
    if((key == 'W' || key == 'S' || key == 'A' || key == 'D') && game_pause.style.display == 'none') { 
        active_wsad_key = key
    }

    // pressed E (action key)
    if(key == 'E' && game_pause.style.display == 'none') {
        // Pick up an item
        if(Grid.items_map[Player.position_y][Player.position_x] != null) {
            // add item to player backpack
            Player.pickupItem(Grid.items_map[Player.position_y][Player.position_x])

            // item is in player backpack so it has no x and y values
            Active_save.Item_list[Grid.items_map[Player.position_y][Player.position_x]].x = null
            Active_save.Item_list[Grid.items_map[Player.position_y][Player.position_x]].y = null

            // remove item from location and grid
            Active_save.Locations[Player.location].items.splice(Active_save.Locations[Player.location].items.indexOf(Grid.items_map[Player.position_y][Player.position_x]), 1)
            Grid.items_map[Player.position_y][Player.position_x] = null

            // reload location
            Grid.importLocation(Player.location)
        }
        //TODO: Add other 'E' functions
    }

    //console.log(key)

    //event.preventDefault()
}
