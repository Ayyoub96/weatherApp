import Link from 'next/link';








import Head from 'next/head';



import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Berlin");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/weather?city=${city}`
      );
      const data = await response.json()
      console.log(data);
      setWeatherData(data);
    }
    fetchData();
  }, [city]);

  if (!weatherData) return <div>Loading...</div>;

  const { name, main, weather, wind, sys } = weatherData;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        {name}, {sys.country}
      </h1>
      <div className="flex items-center justify-center">
        <img
          className="h-20 w-20 mr-2"
          src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt={weather[0].description}
        />
        <div className="text-3xl font-bold">{Math.round(main.temp)}°C</div>
      </div>
      <p className="text-lg mt-4">{weather[0].description}</p>
      <ul className="mt-4 text-lg">
        <li>Feels like: {Math.round(main.feels_like)}°C</li>
        <li>Min temperature: {Math.round(main.temp_min)}°C</li>
        <li>Max temperature: {Math.round(main.temp_max)}°C</li>
        <li>Humidity: {main.humidity}%</li>
        <li>Wind speed: {wind.speed} m/s</li>
        <li>Wind direction: {wind.deg}°</li>
        <li>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</li>
        <li>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</li>
      </ul>
      <div className="mt-4">
        <label htmlFor="cityInput" className="mr-2">
          Enter city:
        </label>
        <input
          id="cityInput"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
         <select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Berlin">Berlin</option>
            <option value="Paris">Paris</option>
            <option value="London">London</option>
            <option value="Marrakech">Marrakech</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Fes">Fes</option>
            <option value="Agadir">Agadir</option>
          </select>
      </div>
    </div>
  );
}

export default Weather;
