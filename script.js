const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

searchWeather = () => {
    const APIKey = '2413f4692bcc336459b31585dbdf1ca5'
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height = '450px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;
                
            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'haze':
                image.src = 'img/haze.png';
                break;

            default: 
            image.src = ''
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '665px';
    })
}


search.addEventListener('click', () => {
    searchWeather();
})

document.querySelector('.search-box input').addEventListener('keypress', (e) => {
    if(e.code === 'Enter'){
        searchWeather();
    }
}) 

