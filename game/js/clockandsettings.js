var clock = document.getElementById('clock')
var options = document.getElementById('game_pause') 
var game_grid_container = document.getElementById('game_grid_container')
var player_menu = document.getElementById('player_menu')
var player_main_stats = document.getElementById('player_main_stats')
var check = 1

options.innerHTML = ` 
    <form>
            <fieldset>
                Rozdzielczość <select name="resolution">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> <br> <br>
                <input type="button" value="Wycztaj zapis" <br> <br>
                <input type="button" value="Zapisz grę" <br> <br>
                <input type="submit" value="Zastosuj ustawienia"> <br> <br>
                <input type="button" value="Wróć do gry" onclick="pauseOrUnpauseGame(false)" <br> <br>
            </fieldset>
        </form>
    `

function settings()
{
    console.log("Halo, dzwonię w sprawie pierdziałki 💩")
    
    if (check == 1)
    {
        options.style.display = 'block'
        game_grid_container.style.display = 'none'
        player_menu.style.display = 'none'
        player_main_stats.style.display = 'none'
        check = check + 1
    }
    else
    {
        options.style.display = 'none'
        game_grid_container.style.display = 'block'
        player_menu.style.display = 'block'
        player_main_stats.style.display = 'block'
        check = check - 1
    }

    form = document.forms[0]
    form.addEventListener('submit', pierdzialka )
}

function pierdzialka(event)
{
    event.preventDefault()
    resolution = form.resolution.value
    console.log("Resolution: ", resolution)
}

function timer() //Current time 
{
    current_time = new Date()
    hours = current_time.getHours()
    minutes = current_time.getMinutes()
    seconds = current_time.getSeconds()

    clock.textContent = `${hours}:${minutes}:${seconds}`
}

