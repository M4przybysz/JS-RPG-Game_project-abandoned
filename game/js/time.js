czas = document.getElementById('czas')

function czasomierz ()
{
    czas_pomocniczy = new Date()
    godziny = czas_pomocniczy.getHours()
    minuty = czas_pomocniczy.getMinutes()
    sekundy = czas_pomocniczy.getSeconds()

    czas.innerHTML = `${godziny}:${minuty}:${sekundy}`
}

window.onload = () => {
    setInterval (czasomierz, 1000)
}
