var apiKey = "48d7a84731553477886491771a6359f3";
var cityWeather = {};
var city = document.getElementById('cityInputName');
var button = document.getElementById('button');


button.addEventListener('click', function(event) {
    event.preventDefault();

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) ?? [];
    searchHistory.push(city.value);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    var list = document.getElementById('searchHistory');
    list.innerHTML = '';
    for (var i = 0; i < searchHistory.length; i++) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(searchHistory[i]));
        list.appendChild(p);
    }

    fetchForecastByCity(city.value)
        .then(data => {
            console.log(data);
            document.getElementById('weatherToday').textContent = `${city.value} ${dayjs.unix(data.daily[0].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconToday').src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
            document.getElementById('tempToday').textContent = `Temp: ${data.daily[0].temp.day}°F`;
            document.getElementById('windToday').textContent = `Wind: ${data.daily[0].wind_speed} MPH`;
            document.getElementById('humidityToday').textContent = `Humidity: ${data.daily[0].humidity} %`;
            document.getElementById('uvToday').textContent = `UV Index: ${data.daily[0].uvi}`

            document.getElementById('weatherD1').textContent = `${dayjs.unix(data.daily[1].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconD1').src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
            document.getElementById('tempD1').textContent = `Temp: ${data.daily[1].temp.day}°F`;
            document.getElementById('windD1').textContent = `Wind: ${data.daily[1].wind_speed} MPH`;
            document.getElementById('humidityD1').textContent = `Humidity: ${data.daily[1].humidity} %`;

            document.getElementById('weatherD2').textContent = `${dayjs.unix(data.daily[2].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconD2').src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;
            document.getElementById('tempD2').textContent = `Temp: ${data.daily[2].temp.day}°F`;
            document.getElementById('windD2').textContent = `Wind: ${data.daily[2].wind_speed} MPH`;
            document.getElementById('humidityD2').textContent = `Humidity: ${data.daily[2].humidity} %`;

            document.getElementById('weatherD3').textContent = `${dayjs.unix(data.daily[3].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconD3').src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`;
            document.getElementById('tempD3').textContent = `Temp: ${data.daily[3].temp.day}°F`;
            document.getElementById('windD3').textContent = `Wind: ${data.daily[3].wind_speed} MPH`;
            document.getElementById('humidityD3').textContent = `Humidity: ${data.daily[3].humidity} %`;

            document.getElementById('weatherD4').textContent = `${dayjs.unix(data.daily[4].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconD4').src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`;
            document.getElementById('tempD4').textContent = `Temp: ${data.daily[4].temp.day}°F`;
            document.getElementById('windD4').textContent = `Wind: ${data.daily[4].wind_speed} MPH`;
            document.getElementById('humidityD4').textContent = `Humidity: ${data.daily[4].humidity} %`;

            document.getElementById('weatherD5').textContent = `${dayjs.unix(data.daily[5].dt).format('(MM/DD/YYYY)')}`;
            document.getElementById('iconD5').src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`;
            document.getElementById('tempD5').textContent = `Temp: ${data.daily[5].temp.day}°F`;
            document.getElementById('windD5').textContent = `Wind: ${data.daily[5].wind_speed} MPH`;
            document.getElementById('humidityD5').textContent = `Humidity: ${data.daily[5].humidity} %`;
        });

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