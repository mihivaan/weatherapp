import React, { useState } from 'react';
import './weatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {

    let api_key = "55caa931df68d89863a5ea00721b2850";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === ''){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity+' %';
        wind[0].innerHTML = Math.round(data.wind.speed)+' km/h';
        temperature[0].innerHTML = Math.round(data.main.temp)+' °c';
        location[0].innerHTML = data.name;

        switch(data.weather[0].icon){
            case '01d' || '01n':
                setWicon(clear_icon);
                break;
            case '02d' || '02n':
                setWicon(cloud_icon);
                break;
            case '03d' || '03n':
                setWicon(drizzle_icon);
                break;
            case '04d' || '04n':
                setWicon(drizzle_icon);
                break;
            case '09d' || '09n':
                setWicon(rain_icon);
                break;
            case '010d' || '010n':
                setWicon(rain_icon);
                break;
            case '013d' || '013n':
                setWicon(snow_icon);
                break;
            default:
                setWicon(clear_icon);
        }
        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setWicon(clear_icon);
        }
    };

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search"/>
            <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">--</div>
        <div className="weather-location">--</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">--</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">--</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WeatherApp;