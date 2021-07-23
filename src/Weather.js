import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "bd915d97f51d3c0651893d85326bd29d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value.toUpperCase());
  }

  let form = (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-9">
          <input
            type="search"
            placeholder="Type a city.."
            className="form-control"
            onChange={updateCity}
          />
        </div>
        <div className="col-3">
          <input
            type="submit"
            value="Search"
            className="btn btn-primary w-100"
          />
        </div>
      </div>
    </form>
  );

  if (loaded) {
    return (
      <div className="Weather-wrapper">
        <div className="Weather">
          {form}
          <div className="card main-info">
            <h1 className="city">{city}</h1>

            <h2 className="description">{weather.description}</h2>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>
                <span className="current-temperature" />
                <span className="celsius">{weather.temperature}°C</span>
              </h5>
              <p className="card-text">
                <small>
                  WIND {weather.wind}KMPH
                  <br />
                  HUMIDITY {weather.humidity}%
                  <br />
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="link">
          <a href="https://github.com/EssieQ/react-weather" target="_blank">
            Open source code
          </a>{" "}
          by Esther Cauven
        </div>
      </div>
    );
  } else {
    return (
      <div className="Weather-wrapper">
        <div className="Weather">
          {form}
          <div className="link">
            <a href="https://github.com/EssieQ/react-weather" target="_blank">
              Open source code
            </a>{" "}
            by Esther Cauven
          </div>
        </div>
      </div>
    );
  }
}
