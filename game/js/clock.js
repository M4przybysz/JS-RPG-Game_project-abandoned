var clock = document.getElementById('clock')

function timer()
{
    current_time = new Date()
    hours = current_time.getHours()
    minutes = current_time.getMinutes()
    seconds = current_time.getSeconds()

    if(hours < 10) hours = '0' + hours
    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds

    clock.textContent = `${hours}:${minutes}:${seconds}`
}
