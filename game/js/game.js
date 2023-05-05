//* This file runs is a game loop
//TODO: Define global html game components ======================================================================================
var isFirstRun = true
var game_grid = Grid.grid
var player_node = null
if(game_grid.innerHTML != '') { 
    player_node = document.getElementById('player_node')
}

//TODO: Put game actions to do when window loads ==========================================================================================
window.onload = () => {
    document.addEventListener('submit', startNewGame)
    
    Grid.importLocation(Player.location)
    gameGridTicks() // First game ticks loop start
}

//TODO: Put game functions during playthrough ===================================================================================
function pauseOrUnpauseGame(hardpause) {
    let game_pause = document.getElementById('game_pause')
    let pause_menu = document.getElementById('game_pause_menu')

    if(isFirstRun == true) {
        game_pause.style.backgroundColor = '#251d22'
    }
    else {
        game_pause.style.backgroundColor = 'rgba(37, 29, 34, 0.6)'
    }

    if(game_pause.style.display === 'none' || hardpause === true) {
        game_pause.style.display = 'block'
        pause_menu.style.display = 'block'
    }
    else {
        game_pause.style.display = 'none'
        pause_menu.style.display = 'none'
    }
}

function createPlayer() {
    document.getElementById('game_start_menu').style.display = 'none'
    document.getElementById('player_creator').style.display = 'block'
}

function createImportSave() {
    document.getElementById('game_start_menu').style.display = 'none'
    document.getElementById('import_save').style.display = 'block'
}

function startNewGame(event) {
    event.preventDefault()

    let warrior_button = document.getElementById('warrior_button')
    let mage_button = document.getElementById('mage_button')

    let playerName = document.getElementById('player_name_input').value
    let playerClass = ""
    
    if(warrior_button.classList.contains("selected")) {
        playerClass = "warrior"
    } 
    else if(mage_button.classList.contains("selected")) {
        playerClass = "mage"
    }

    if(playerClass === "") {
        console.log("Please select a class.")
    } 
    else {
        console.log(`Starting new game with player name: ${playerName} and class: ${playerClass}`)

        isFirstRun = false

        document.getElementById('player_creator').style.display = 'none'
        document.getElementById('game_pause').style.display = 'none'

        document.addEventListener('keydown', keydownActions)
    }
}

//TODO: Implement importing saves ===================================================================================
function importSave() { 
    read = document.getElementById('reader')

    function printFile(file) {
        const reader = new FileReader()
        reader.onload = (evt) => {
            let str = evt.target.result
            console.log(str)
        }
        reader.readAsText(file)
    }

    read.addEventListener('change', (event) => {
        const file = event.target.files[0]
        printFile(file)
    })
}

function exportSave() {

}

function openMenuTab(tab_number) {
    for(let i = 1; i < 5; i++) document.getElementById(`tab${i}`).style.display = 'none'

    document.getElementById(`tab${tab_number}`).style.display = 'block'
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

document.onvisibilitychange = () => {
    if(document.visibilityState === 'visible') { // Restart gameGridTicks() every time user is back on the site
        expected_time_diff = Date.now() + interval 
        gameGridTicks()
    }
    if(document.visibilityState === 'hidden' && isFirstRun == false) { // Pause game when user is not on the site
        pauseOrUnpauseGame(true)
    }
}