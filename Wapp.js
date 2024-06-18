const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const nameOutput = document.querySelector('.name');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud-value');
const humidityOutput = document.querySelector('.humidity-value');
const windOutput = document.querySelector('.wind-value');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');

let cityInput = "Hisar";

// Your OpenWeatherMap API key (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = 'd8d939835c7db5689790973ecce67305';

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
});

function fetchWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=d8d939835c7db5689790973ecce67305&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert('City not found,Please type in a valid city name.');
                app.style.opacity = "1";
                return;
            }

            nameOutput.innerHTML = data.name;
            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            conditionOutput.innerHTML = data.weather[0].description;
            icon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
            cloudOutput.innerHTML = data.clouds.all;
            humidityOutput.innerHTML = data.main.humidity;
            windOutput.innerHTML = data.wind.speed;

        
        const currentTime = data.dt;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const isDayTime = currentTime >= sunrise && currentTime <= sunset;

        const weatherCondition = data.weather[0].main.toLowerCase();

        let backgroundUrl = '';
        let textColor = '';

        if (isDayTime) {
            textColor = '#000';
            if (weatherCondition.includes('clear')) {
                backgroundUrl = 'url(clear_Day.jpg)';
            } else if (weatherCondition.includes('clouds')) {
                backgroundUrl = 'url(cloud_Day.jpg)';
            } else if (weatherCondition.includes('rain')) {
                backgroundUrl = 'url(rain_Day.jpg)';
            } else if (weatherCondition.includes('snow')) {
                backgroundUrl = 'url(snow_Day.jpg)';
            } else if (weatherCondition.includes('thunderstorm')) {
                backgroundUrl = 'url(Day.jpg)';
            } else {
                backgroundUrl = 'url(default_Day.jpg)';
            }
        } else {
            textColor = '#fff';
            if (weatherCondition.includes('clear')) {
                backgroundUrl = 'url(night_clear.jpg)';
            } else if (weatherCondition.includes('clouds')) {
                backgroundUrl = 'url(night_cloud.jpg)';
            } else if (weatherCondition.includes('rain')) {
                backgroundUrl = 'url(night_rain.jpg)';
            } else if (weatherCondition.includes('snow')) {
                backgroundUrl = 'url(night_snow.jpg)';
            }else if (weatherCondition.includes('thunderstorm')) {
                backgroundUrl = 'url(thunder.jpg)';
            } else {
                backgroundUrl = 'url(night_default.jpg)';
            }
        }

        // Update the body background
        document.body.style.backgroundImage = backgroundUrl;
        document.body.style.color = textColor;

        app.style.color = textColor;
                        temp.style.color = textColor;
                        nameOutput.style.color = textColor;
                        conditionOutput.style.color = textColor;
                        cloudOutput.style.color = textColor;
                        humidityOutput.style.color = textColor;
                        windOutput.style.color = textColor;

                        document.querySelectorAll('.weather-info div').forEach(element => {
                            element.style.color = textColor;
                        });


        app.style.opacity = "1";
    })
    .catch(() => {
        alert('Failed to fetch weather data');
        app.style.opacity = "1";
    });
   
    

}


// Fetch weather data for the initial city
fetchWeatherData();
