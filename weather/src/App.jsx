import { useEffect, useState } from 'react'

import './App.css'
//images
import Search from "./assets/search.png"
import clearIcon from "./assets/clear.jpg"
import snowIcon from "./assets/snowicon.png"
import humidityIcon from "./assets/humidity.png"
import windIcon  from "./assets/wind.png"
import rainIcon from "./assets/rain.png"
import cloudIcon from "./assets/cloud.png"
import drizzleIcon from "./assets/drizzle.png"
// import  from "./"

const WeatherDetails = ({icon ,temp, city, country, lat ,log ,humidity,wind,}) =>{
  return(
    <>
    <div className="image">
      <img src={icon}  />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon}  className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon}   className='icon'/>
        <div className="data">
          <div className="wind-percent">{wind}km/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
      
    </div>
   
    </>

  )
 
}

function App() {
 let api_key="0ce0411ff4cf9b0f83f3b7a41e7a7dfa";
 const [text,setText]=useState("chennai")
 const [icon, setIcon]=useState(snowIcon)
 const [temp, setTemp]=useState(0)
 const [city, setCity]=useState("chennai")
 const [country, setCountry]=useState("IN")
 const [log,setLog]=useState(0)
 const [lat,setLat]=useState(0)
 const [humidity,setHumidity]=useState(0)
 const [wind,setWind]=useState(0)
 const [cityNotFound ,setcityNotFound]=useState(false)
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState(null)
 const weatherIconMap ={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,

  
 }

 const search = async ()=>{
  setLoading(true)
 
  let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try{
    let res = await fetch(url)
    let data = await res.json()
    if(data.cod === "404"){
      console.error("city not found")
      setcityNotFound(true)
      setLoading(false)
      return;
    }
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.log)
    const weatherIconCode =data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || clearIcon)
    setcityNotFound(false)

  }catch(error){
    console.error("An error occured",error.message);
     setError("An Error occured while fetching weather data.")
  }finally{
    setLoading(false)
  }

}
const handleCity =(e)=>{
  setText(e.target.value)
}
const handlekeyDown =(e)=>{
  if (e.key === "Enter"){
    search();
  }
}
useEffect(function(){
  search();
},[]);
  return (
    <>
      <div className='container'>
        <div className="inputcontainer">
          <input type='text' className='cityInput' placeholder='search city'onChange={handleCity} value={text} onKeyDown={handlekeyDown}/>
          <div className="search-icon" onClick={()=>search()}>
            <img src={Search} height={25} width={25}/>
          </div>
        </div>
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} 
        humidity={humidity} wind={wind}/>}
         {loading && <div className='loadingmsg'>Loading...</div>}
   { error && <div className="errormsg">{error}</div>}
    {cityNotFound && <div className="citynotfound">City not found</div>}
    <p className='copyright'>Designed by <span>Srinivasan</span></p>
      </div>
     
    </>
  )
}

export default App
