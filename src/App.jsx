import SearchCity from "./components/SearchCity.jsx";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

export default function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${param}`);
      const data = await response.json();
      console.log(data, 'data');

      if(data){
        setWeatherData(data);
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  const temp = Math.round((weatherData?.main?.temp - 273.15)*100)/100;

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  useEffect(() => {
    fetchWeatherData('London');
  },[]);

  return (
    <div className='max-sm:w-[100%] max-sm:h-screen max-sm:border-none max-sm:bg-black/60 max-sm:backdrop-blur-none flex flex-col w-[50%] md:max-lg:w-[60%] justify-self-center rounded-lg border border-white h-[550px] m-8 p-8 backdrop-blur-sm'>
    <h1 className="max-sm:text-3xl text-5xl font-bold mb-5 text-white text-center">Weather App</h1>
    <SearchCity
    search={search}
    setSearch={setSearch}
    handleSearch={handleSearch}
    />
    { loading ? (
      <div className="flex justify-center items-center"> 
      <OrbitProgress variant="spokes" color="#ffff00" size="large" text="" textColor="" /> 
      </div>
    ) : ( 
      <div className="max-sm:mt-7 flex flex-col mt-10 justify-evenly items-center text-white text-3xl">
          <h1 className="text-4xl font-bold ">{weatherData?.name}</h1>
          <img className='h-[55px] m-2' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${weatherData?.sys?.country}.svg`}/>
          <p className="font-bold text-5xl">{temp} C</p>
          <p className="max-sm:text-lg font-bold italic">{getCurrentDate()}</p>
          <p className="max-sm:text-2xl font-bold">{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}</p>
          <p className="max-sm:text-2xl font-bold">Wind Speed : {weatherData?.wind?.speed}</p>
          <p className="max-sm:text-2xl font-bold">Humidity : {weatherData?.main?.humidity}%</p>
      </div>
      )}
    </div>
  )
}