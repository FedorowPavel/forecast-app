import citiesService from './cities-service.js';
import weatherService from './weather-service.js';
import debounce from './debounce.js';


const form = document.getElementById('search');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search input');
const autocompleteContainer = document.querySelector('.autocomplete');
const listContainer = document.getElementById('list-container');
const weatherContainer = document.getElementById('weather');
const inputLoader = document.querySelector('.input-loader');
const loader = document.querySelector('.loader');


function renderWeather(currentWeather, forecast) {
  weatherContainer.innerHTML = '';
  const div = document.createElement('div');

  div.innerHTML = `<span>Current temp: ${currentWeather.main.temp}</span>`

  const ul = document.createElement('ul');

  const listItems = forecast.list.map(day => {
    const date = new Date(day.dt * 1000);
    return `<li>Day: ${date.toLocaleDateString()} Temp: ${day.temp.day}</li>`
  })

  ul.innerHTML = listItems.join('');

  weatherContainer.appendChild(ul);
  weatherContainer.appendChild(div);
}

async function getWeather(cityName) {
  try {
    
    loader.style.display = "block";

    const currentWeather = await weatherService.getCurrentWeather(cityName);

    const forecast = await weatherService.getForecast(cityName);

    renderWeather(currentWeather, forecast);
  } catch (error) {
    weatherContainer.innerHTML = error.message;
  } finally {
    loader.style.display = "none";
  }
  
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const cityName = formData.get('city-name');

  if (!cityName) {
    return
  }

  getWeather(cityName);
 
});

function removeListContainer() {
  listContainer.style.display = 'none';
}

 listContainer.addEventListener('mousedown', (event) => {
   const listItem = event.target.closest('.list-item');
   
   const cityName = listItem.querySelector('strong').textContent;

   searchInput.value = cityName;


   getWeather(cityName);

})

function renderCityList(cities) {
  
  listContainer.style.display = 'block';


  if (!cities.length) {
    listContainer.innerHTML = '<div>no match</div>'

    return
  }

  const listItems = cities.map((city) => {
    return `<div class="list-item"><strong>${city.name}</strong>${city.country}</div>`
  })

 
  

  listContainer.innerHTML = listItems.join('');

}

searchInput.addEventListener('blur', () => {
  removeListContainer();
})


searchInput.addEventListener('focus', () => {
  listContainer.style.display = 'block';
})

searchInput.addEventListener('input', debounce(async (event) => {
  const {
    value
  } = event.target;

  inputLoader.style.display = 'block';

  const cities = await citiesService.getCities();

  inputLoader.style.display = 'none';

  const match = cities.filter((city) => {
    if (city.name.toUpperCase().includes(value.toUpperCase())) {
      return true;
    }
    return false;
  });

  renderCityList(match.slice(0, 5));

}, 250));