var clock = document.getElementById('clock')

function timer()
{
    current_time = new Date()
    hours = current_time.getHours()
    minutes = current_time.getMinutes()
    seconds = current_time.getSeconds()

    clock.textContent = `${hours}:${minutes}:${seconds}`
}
