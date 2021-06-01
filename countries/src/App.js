import axios from "axios";
import { useEffect, useState } from "react";

const api_key = process.env.REACT_APP_API_KEY;

const ListofCountries = ({ data }) => {
  if (data.length > 10) {
    return <p>Too many results</p>;
  } else {
    return data.map((country) => (
      <ShowCountry key={country.numericCode} country={country} />
    ));
  }
};

const ShowCountry = ({ country }) => {
  const [showInfo, setShowInfo] = useState(true);
  const changeInfoVisible = (event) => {
    setShowInfo(!showInfo);
  };

  if (showInfo) {
    return (
      <div>
        <p>{country.name}</p>
        <button onClick={changeInfoVisible}>Show Info</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>{country.name}</p>
        <button onClick={changeInfoVisible}>Hide Info</button>
        <CountryInfo country={country} />
      </div>
    );
  }
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const getWeather = () =>
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((Response) => {
        setWeather(Response.data);
      });

  useEffect(getWeather, [country.capital]);

  return (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="150" alt="weather" />
      <ShowWeather weather={weather} countryCapital={country.capital} />
    </div>
  );
};

const ShowWeather = ({ weather, countryCapital }) => {
  if (weather.current) {
    return (
      <div>
        <h1>Weather in {countryCapital}</h1>
        <p>Temperature: {weather.current.temperature} Celsius</p>
        <p>Wind: {weather.current.wind_speed} mph, direction:{" "} {weather.current.wind_dir}</p>
        <img src={weather.current.weather_icons[0]} width="150" alt="weather" />
      </div>
    );
  } else {
    return <p>Loading weather...</p>;
  }
};


const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  const FilteredData = countryData.filter((country) =>
    country.name.toLowerCase().includes(filterCountry.toLowerCase())
  );

  const onFilterChange = (event) => {
    event.preventDefault();
    setFilterCountry(event.target.value);
  };

  const getCountryData = () => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((Response) => {
      setCountryData(Response.data);
    });
  };

  useEffect(getCountryData, []);

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries:{" "}
        <input value={filterCountry} onChange={onFilterChange}></input>
      </div>
      <ListofCountries data={FilteredData} />
    </div>
  );
};

export default App;
