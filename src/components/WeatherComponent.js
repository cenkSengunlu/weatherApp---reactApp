import React, { useState, useEffect } from 'react';
import cssThemeObject from '../cssThemeObject';
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

     // Tema belirleyici toggle'ın durumunu tut
    const [checked, setChecked] = useState(false);

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
        let dayOrNight = '';
        if(regionalTime.getHours() > 6 && regionalTime.getHours() < 19){
            dayOrNight = 'day';
        }   else{
            dayOrNight = 'night';
        }

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

     // Checkbox ile tema durumunu güncelle
    const handleChange = () => {
        if(!checked){
          setChecked(true);
    
          // CSS değişkenleri temanın durumuna göre güncellemek için obje döndür
          for(const [key, value] of Object.entries(cssThemeObject)){
            document.documentElement.style.setProperty(key, value.dark);
          }
    
        } else{
          setChecked(false);
    
          // CSS değişkenleri temanın durumuna göre güncellemek için obje döndür
          for(const [key, value] of Object.entries(cssThemeObject)){
            document.documentElement.style.setProperty(key, value.light);
          }
    
        } 
      }

    return(
        <div className="container">

            {/* Input + Submit Button + Toggle*/}
            <div className="box">
                <div className="headBox">
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
                    <div className="checkBox">
                        <label className="switch">
                          <input type="checkbox" name="themeSelector" onChange={() => handleChange()}/>
                          <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                

                {/* Şehrin Hava Durumu Bilgilerini Yazdır */}
                <div className="weatherInfo">
                {
                    weatherItem && (
                        <>
                            <div className="weatherName">{`Weather in ${cityItem.name}`}</div>
                            <div className="weatherTemp">{`${weatherItem.main.temp} °C`}</div>
                            <div className="descriptionBox">
                                <img className="weatherIcon" src={process.env.PUBLIC_URL + `${iconSrc(weatherItem.timezone)}`} alt="weatherIcon" />
                                <div className="weatherDescription">{`${makeUpper(weatherItem.weather[0].description)}`}</div>
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