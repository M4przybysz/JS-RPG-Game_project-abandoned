var active_wsad_key = null
var key_switch = false
var ability_lock = [false, false, false, false]

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
        return
    }

    if(game_pause.style.display == 'none') {
        // Pressed WSAD
        if((key == 'W' || key == 'S' || key == 'A' || key == 'D')) { 
            active_wsad_key = key

            return
        }

        // Pressed E (action key)
        if(key == 'E') {
            // Interaction with NPC
            if(Player.direction == 'W' && Grid.creatures_map[Player.position_y - 1][Player.position_x] != null && Grid.creatures_map[Player.position_y - 1][Player.position_x].attitude == 'friendly') {
                startDialogue(Grid.creatures_map[Player.position_y - 1][Player.position_x])
                return
            }
            else if(Player.direction == 'S' && Grid.creatures_map[Player.position_y + 1][Player.position_x] != null && Grid.creatures_map[Player.position_y + 1][Player.position_x].attitude == 'friendly') {
                startDialogue(Grid.creatures_map[Player.position_y + 1][Player.position_x])
                return
            }
            else if(Player.direction == 'A' && Grid.creatures_map[Player.position_y][Player.position_x - 1] != null && Grid.creatures_map[Player.position_y][Player.position_x - 1].attitude == 'friendly') {
                startDialogue(Grid.creatures_map[Player.position_y][Player.position_x - 1])
                return
            }
            else if(Player.direction == 'D' && Grid.creatures_map[Player.position_y][Player.position_x + 1] != null && Grid.creatures_map[Player.position_y][Player.position_x + 1].attitude == 'friendly') {
                startDialogue(Grid.creatures_map[Player.position_y][Player.position_x + 1])
                return
            }
            
            // Pick up an item
            if(Grid.items_map[Player.position_y][Player.position_x] != null) { itemPickUp(0, 0) }
            else if(Grid.items_map[Player.position_y - 1][Player.position_x] != null && Player.direction == 'W') { itemPickUp(0, -1) }
            else if(Grid.items_map[Player.position_y + 1][Player.position_x] != null && Player.direction == 'S') { itemPickUp(0, 1) }
            else if(Grid.items_map[Player.position_y][Player.position_x - 1] != null && Player.direction == 'A') { itemPickUp(-1, 0) }
            else if(Grid.items_map[Player.position_y][Player.position_x + 1] != null && Player.direction == 'D') { itemPickUp(1, 0) }

            return
        }

        // Used abilities
        if(key == 'Q' || key == '1' || key == '2' || key == '3') {
            // Q(0) - normal attack
            // 1 - Ability 1
            // 2 - Ability 2
            // 3 - Ability 3

            let ability_number = (key == 'Q') ? 0 : parseInt(key)
            
            if(ability_lock[ability_number] != true) {
                ability_lock[ability_number] = true
                Player.useAbility(ability_number)
            }

            return
        }
    }
}

function keyupActions(event) {
    if(key_switch == false) return

    let key = event.key.toUpperCase()

    // Stop player walk
    if((key == 'W' || key == 'S' || key == 'A' || key == 'D')) { 
        active_wsad_key = null
    }
}