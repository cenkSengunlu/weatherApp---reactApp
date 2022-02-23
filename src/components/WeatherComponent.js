import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
    const apiKey = "bfc5a840b7772812d48cf0b2a6437494";
    const limit = 5;
    const [cityData, setCityData] = useState("");
    const [cityName, setCityName] = useState("londra");
    const [weatherItem, setWeatherItem] = useState([{}]);

    const getValue = (val) => {
        setCityData(val.target.value);
    }


    useEffect(async () => {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`)
        const data = await response.json();
        setWeatherItem(data);
    }, [cityName]);

    const handleClick = () => {
        if(cityName.trim() === ""){
            return;
        }
        console.log(weatherItem);
        setCityName(cityData);
        setCityData("");
        
    }

    return(
        <div className="container">

            {/* Input + Submit Button */}
            <div className="searchBox">
                <input type="text" value={cityData} placeholder="Enter City Name" className="inputClass" onChange={getValue} 
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") { handleClick(); } }}
                    >
                </input>
                <button className="searchBtn" onClick={() => handleClick()}>Search</button>
            </div>

            {/* Şehir Yazdır */}
            <div className="citySelectList">
                {weatherItem.map((x, i) => {
                    return(
                        <div key={i}>{x.lat}, {x.lon}</div>
                    );
                })}
            </div>
            
        </div>
        
        
    )

}

export default WeatherComponent;