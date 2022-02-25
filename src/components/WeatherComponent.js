import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
    const apiKey = "bfc5a840b7772812d48cf0b2a6437494";
    const limit = 1;
    const [inputVal, setInputVal] = useState("");
    const [cityName, setCityName] = useState("");
    
    const [cityItem, setCityItem] = useState(null);

    const [weatherItem, setWeatherItem] = useState(null);

    const getValue = (val) => {
        setInputVal(val.target.value);
    }


    // Get Coordinats
    useEffect(() => {
        if(!cityName){
            return;
        }
        async function getCoordinat() {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`);
            const data = await response.json();
            if(!data[0]){
                alert(`${cityName} not found!`);
                return;
            }
            setCityItem(data[0]);
            
        }
        getCoordinat();
    }, [cityName]);

  

    // Get Weather Info
    useEffect(() => {
        if(!(cityItem && cityItem.lat && cityItem.lon)){
            return;
        }
        async function getCity() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cityItem?.lat}&lon=${cityItem?.lon}&appid=${apiKey}`);
            const data = await response.json();
            setWeatherItem(data);
            console.log(data); 
        }
        getCity();
        
    }, [cityItem]);



    const handleClick = () => {
        if(inputVal.trim() === ""){
            return;
        }
        setCityName(inputVal);
        setInputVal("");
        
    }

    return(
        <div className="container">
            <div className="box">
                {/* Input + Submit Button */}
                <div className="searchBox">
                    <input type="text" value={inputVal} placeholder="Enter City Name" className="inputClass" onChange={getValue} 
                        onKeyPress={(ev) => {
                          if (ev.key === "Enter") { handleClick(); } }}
                        >
                    </input>
                    <div className="searchBtn" onClick={() => handleClick()}>
                        <img src={process.env.PUBLIC_URL + '/images/search.svg'} className="searchImg" />
                    </div>
                    
                </div>

                {/* Şehir Yazdır */}
                <div className="weatherInfo">
                {
                    weatherItem && (
                        <>
                            <div className="weatherName">{`Weather in ${weatherItem.name}`}</div>
                            <div className="weatherTemp">{`${weatherItem.main.temp} °C`}</div>
                            <div className="descriptionBox">
                                <img className="weatherIcon" src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png`} alt="weatherIcon" />
                                <div className="weatherDescription">{`${weatherItem.weather[0].description}`}</div>
                            </div>
                            <div className="weatherHumidity">{`Humidity: ${weatherItem.main.humidity}%`}</div>
                            <div className="weatherWindSpeed">{`Wind speed: ${weatherItem.wind.speed} km/h`}</div>
                        </>
                    )
                } 
                </div>
            </div>
            

            
        </div>
        
        
    )

}

export default WeatherComponent;