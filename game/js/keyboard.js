var active_wsad_key = null

const KEY_MAP = {
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

    //console.log(key)

    //event.preventDefault()
}
