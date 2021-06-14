var apiKey = "48d7a84731553477886491771a6359f3";
var cityWeather = {};
var city = document.getElementById('cityInputName');
var button = document.getElementById('button');


button.addEventListener('click', function(event) {
    event.preventDefault();
    fetchForecastByCity(city.value)
        .then(data => {
            console.log(data);
            document.getElementById('weatherToday').textContent = `${city.value} ${dayjs.unix(data.daily[0].dt).format('(MM/DD/YYYY)')}`;
            //document.getElementById('currentWeather').textContent = data.weather[0].icon;
            document.getElementById('tempToday').textContent = `Temp: ${data.daily[0].temp.day}°F`;
            document.getElementById('windToday').textContent = `Wind: ${data.daily[0].wind_speed} MPH`;
            document.getElementById('humidityToday').textContent = `Humidity: ${data.daily[0].humidity} %`;
            document.getElementById('uvToday').textContent = `UV Index: ${data.daily[0].uvi}`
        });

    // fetchForecastByCity(city.value)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         var forecast = data.list.reduce(function(acc, day) {
    //             var date = new Date(day.dt_txt);
    //             var existing = acc.find(element => element.dateMy == date.getDate());
    //             if (!existing) {
    //                 acc.push({ dateMy: date.getDate(), ...day})
    //             }
    //             return acc;
    //         }, []);
    //     });
        
});

function fetchForecastByCity(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => fetchForecastByCoord(data.coord.lat, data.coord.lon));
}

function fetchForecastByCoord(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(response => response.json());
}

// function fetchWeatherByCity(cityName) {
//     var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
//     return fetch(url);
// }

// function fetchForecastByCity(cityName) {
//     var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
//     return fetch(url);
// }

function fetchUvIndex() {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
    return fetch(url);
}