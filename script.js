const input = document.getElementById('inp')
const button = document.getElementById('btn')
const form = document.querySelector('form')
const output = document.getElementById('output')
const general = document.getElementById('general')



const API = 'https://api.openweathermap.org/data/2.5/weather?q='

const KEY = '&appid=48a1a8c1db4dc8553a0dfc6bca525a56'

const searchCity = async () => {


    const url = API + input.value + KEY
    const request = await fetch(url)
    const response = await request.json()
    console.log(response)
    input.value = ''
    renderWeather(response)
    getMap(response.coord)
}


const renderWeather = (user) => {
    output.innerHTML = ''
    general.innerHTML = ''
    const nameCity = document.createElement('h2')
    nameCity.textContent = 'City : ' + user.name
    general.append(nameCity)

    const weat = document.createElement('h2')
    weat.textContent = 'Weather : ' + user.weather[0].main
    general.append(weat)


    const temp = document.createElement('h2')
    temp.textContent = 'Temperature :' + (user.main.temp - 273.15).toFixed(2) + ' C'
    general.append(temp)

    output.append(general)


}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchCity()


})

const getMap = (coord) => {
    let map = document.createElement('div')
    map.id = ('map')

    DG.then(function () {
        map = DG.map('map', {
            center: [coord.lat, coord.lon],
            zoom: 13
        });

        DG.marker([coord.lat, coord.lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    })
    output.prepend(map)
}