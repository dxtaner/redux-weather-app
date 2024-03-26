// src/components/WeatherComponent.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "../redux/actions/weatherActions";
import api from "../utils/api";
import "./WeatherComponent.css";

const WeatherComponent = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.weatherData);
  const [city, setCity] = useState("Bursa");

  const handleSearch = async () => {
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      const response = await api.get(`/weather?q=${city}&appid=${apiKey}`);
      dispatch(setWeatherData(response.data));
    } catch (error) {
      console.error("Weather data could not be retrieved.", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, [city, dispatch]);

  const getWeatherIconUrl = (icon) =>
    `https://openweathermap.org/img/w/${icon}.png`;

  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {weatherData ? (
        <div>
          <div className="current-date">Current Date: {getCurrentDate()}</div>
          <h2 className="cityName">{weatherData.name} Weather</h2>
          <div className="weather-details">
            <div className="weather-icon">
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
              />
            </div>
            <div className="temperature">
              {Math.round(weatherData.main.temp - 273.15)}°C
            </div>
            <div className="description">
              {weatherData.weather[0].description}
            </div>
            <div className="humidity">
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className="wind-speed">
              Wind Speed: {weatherData.wind.speed} m/s
            </div>
            <div className="sun-times">
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleDateString()}
            </div>
            <div className="sun-times">
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleDateString()}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
