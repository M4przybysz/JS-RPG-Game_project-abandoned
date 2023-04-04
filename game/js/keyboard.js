var active_wsad_key = null

const KEY_DICT = {
    'A' : 'left',
    'D' : 'right',
    'S' : 'down',
    'W' : 'up'
}

function itemPickUp(x_mod, y_mod) {
    // Add item to player backpack
    Player.pickUpItem(Grid.items_map[Player.position_y + y_mod][Player.position_x + x_mod])

    // Item is in player backpack so it has no x and y values
    Active_save.Item_list[Grid.items_map[Player.position_y + y_mod][Player.position_x + x_mod]].x = null
    Active_save.Item_list[Grid.items_map[Player.position_y + y_mod][Player.position_x + x_mod]].y = null

    // Remove item from location and grid
    Active_save.Locations[Player.location].items.splice(Active_save.Locations[Player.location].items.indexOf(Grid.items_map[Player.position_y + y_mod][Player.position_x + x_mod]), 1)
    Grid.items_map[Player.position_y + y_mod][Player.position_x + x_mod] = null

    // Reload location
    Grid.importLocation(Player.location)
}

function itemDrop(item_id, drop_from_eq = false, eq_place = null) {
    if((Grid.items_map[Player.position_y][Player.position_x] === null && Player.backpack.includes(item_id)) || (drop_from_eq == true && eq_place != null)) {
        if(drop_from_eq == true && eq_place != null) { Player.dropEqItem(eq_place) }
        else { Player.dropItem(item_id) }

        // Add item to location
        Grid.items_map[Player.position_y][Player.position_x] = item_id 
        if(Active_save.Locations[Player.location].items == null) Active_save.Locations[Player.location].items = []
        Active_save.Locations[Player.location].items.push(item_id)

        Active_save.Item_list[item_id].x = Player.position_x
        Active_save.Item_list[item_id].y = Player.position_y

        // Refresh location
        Grid.importLocation(Player.location)
    }
    else {
        console.log(`can't drop this item at this location`)
    }
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
