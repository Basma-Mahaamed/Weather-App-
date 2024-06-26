document.addEventListener("DOMContentLoaded", function () {
  const dayIcon = "https://cdn.weatherapi.com/weather/64x64/day/113.png";
  const nightIcon = "https://cdn.weatherapi.com/weather/64x64/night/113.png";
  const apiKey = "0e57ccb3556340cca66192203242006";
  const searchButton = document.getElementById("searchButton");
  const cityInput = document.getElementById("cityInput");
  const weatherContainer = document.getElementById("weatherContainer");
  const contactLink = document.getElementById("contactLink");
  const contactForm = document.getElementById("contactForm");

  searchButton.addEventListener("click", function () {
    const cityName = cityInput.value.trim();
    if (cityName) {
      fetchWeather(cityName);
    } else {
      alert("Please enter a city name.");
    }
  });

  contactLink.addEventListener("click", function () {
    contactForm.style.display = "block";
  });

  function fetchWeather(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  function displayWeather(data) {
    const forecast = data.forecast.forecastday;
    weatherContainer.innerHTML = "";
    forecast.forEach((day, index) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const weatherCard = `
        <div class="col-md-4" style="${index === 0 ? "background-color: black;" : ""}">
          <div class="card weather-card">
            <div class="card-body">
              <h5 class="card-title">${dayName}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${day.date}</h6>
              <img src="${day.day.condition.icon}" class="weather-icon" alt="Weather icon">
              <p class="card-text">${day.day.maxtemp_c} °C</p>
              <p class="card-text">Temp Right Now: ${day.hour[new Date().getHours()].temp_c} °C</p>
              <p class="card-text">${day.day.condition.text}</p>
              <img src="${day.hour[new Date().getHours()].is_day === 1 ? dayIcon : nightIcon}" class="day-night-icon" alt="Day/Night icon">
            </div>
          </div>
        </div>
      `;
      weatherContainer.insertAdjacentHTML("beforeend", weatherCard);
    });
  }
});