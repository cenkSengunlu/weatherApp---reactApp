import React, { useState, useEffect } from 'react';
import svgObject from '../svgObject';
import timezoneObject from '../timezoneObject';

const WeatherComponent = () => {
    const apiKey = "bfc5a840b7772812d48cf0b2a6437494";
    const limit = 1;
    // Input içerisindeki değeri tut
    const [inputVal, setInputVal] = useState("");

    // Input'tan gelen değer atanacak
    const [cityName, setCityName] = useState("");
    
    // Geocoding Api'ından gelecek objeyi tut
    const [cityItem, setCityItem] = useState(null);

    // Openweather Api'ından gelecek objeyi tut
    const [weatherItem, setWeatherItem] = useState(null);



    // Input'taki veriyi al
    const getValue = (val) => {
        setInputVal(val.target.value);
    }

    // Weather Description'dan gelen değerin ilk harflerini büyült
    const makeUpper = (val) =>{
        val = val.split(" ");
        for(let i = 0; i < val.length; i++){
            let firstLetter = val[i][0];
            let otherVal = val[i].substr(1);
            val[i] = firstLetter.toUpperCase() + otherVal;
        }

        return val.join(" ");
    }


    // Get Coordinats
    useEffect(() => {
        if(!cityName){
            return;
        }
        async function getCoordinat() {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`);
            const data = await response.json();
            // cityName değeri geocoding Api'da bir şeyle eşleşmezse hata mesajı ver.
            if(!data[0]){
                setCityItem(data[1]);
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
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${cityItem?.lat}&lon=${cityItem?.lon}&appid=${apiKey}`);
                const data = await response.json();
                setWeatherItem(data);
                console.log(data);
            } catch{
                alert("Error!");
                return;
            }
        }
        getCity();
        
    }, [cityItem]);


    
    const iconSrc = (timezone) => {
        if(timezone < 0){
            timezone = Math.abs(timezone);
        }
        const date = new Date();
        const utcTime = Date.parse(date.toISOString().replace('Z', ''));
        const totalTime = utcTime + parseInt(timezoneObject[String(timezone)]);
        const regionalTime = new Date(totalTime);
        // setWeatherTime(`${regionalTime.getHours()}:${regionalTime.getMinutes()}`);
        let dayOrNight = '';
        if(regionalTime.getHours() > 6 && regionalTime.getHours() < 19){
            dayOrNight = 'day';
        }   else{
            dayOrNight = 'night';
        }

        // console.log(regionalTime);
       

        return svgObject[weatherItem.weather[0].main][dayOrNight];
    }

    


    // Input'tan gelen değer boş değil ise cityName'e ata
    const handleClick = () => {
        if(inputVal.trim() === ""){
            return;
        }
        setCityName(inputVal);
        setInputVal("");
    }



    return(
        <div className="container">

            {/* Input + Submit Button + Toggle*/}
            <div className="box">
                <div className="searchBox">
                    <input type="text" value={inputVal} placeholder="Enter City Name" className="inputClass" onChange={getValue} 
                        onKeyPress={(ev) => {
                          if (ev.key === "Enter") { handleClick(); } }}
                        >
                    </input>
                    <div className="searchBtn" onClick={() => handleClick()}>
                        {svgObject['Search']}
                        {/* <img src={process.env.PUBLIC_URL + '/images/search.svg'} className="searchImg" alt="search"/> */}
                    </div>
                </div>
                

                {/* Şehrin Hava Durumu Bilgilerini Yazdır */}
                <div className="weatherInfo">
                {
                    weatherItem && (
                        <>
                            <div className="weatherName">{`${cityItem.name}, ${weatherItem.sys.country}`}</div>
                            <div className="descriptionBox">
                                <div className="weatherIcon">{iconSrc(weatherItem.timezone)}</div>
                                {/* <img className="weatherIcon" src={process.env.PUBLIC_URL + `${iconSrc(weatherItem.timezone)}`} alt="weatherIcon" /> */}
                                <div className="weatherDescription">{`${makeUpper(weatherItem.weather[0].description)}`}</div>
                            </div>
                            <div className="weatherTemp">{`${weatherItem.main.temp}°C`}</div>
                            
                            <div className="miniInfo">
                                <div className="weatherWindSpeed">
                                    <img className="miniIcon" src={process.env.PUBLIC_URL + `/images/windspeed.svg`} alt="Wind Speed" />
                                    <div>{`${weatherItem.wind.speed}km/h`}</div>
                                </div>

                                <div className="weatherHumidity">
                                    <img className="miniIcon" src={process.env.PUBLIC_URL + `/images/drop.svg`} alt="Humidity" />
                                    <div>{`${weatherItem.main.humidity}%`}</div>
                                    {/* <div>{`        ${weatherTime}`}</div> */}
                                </div>
                            </div>
                            
                            
                        </>
                    )
                } 
                </div>
            </div>
        </div>
    )
}

export default WeatherComponent;