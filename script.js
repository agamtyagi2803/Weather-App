//fetchweatherdata function--IN this function we will fetch data from weatherapi
//fetchweatherui function--IN this function we will show weather data in UI


const apikey='a6da68df95f2a25434f986bca10dc463';
async function fetchWeatherData(city){

    //to fetch data we will use fetch() method
    try{
    const response=await fetch('https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={apikey}');
    if(!response.ok){
        throw new Error("Unable to fetch weather data");
    }
    //converting response to json format
    const data=await response.json();
    //printing data in console
    // console.log(data);
    // console.log(data.main.temp);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.visibility);
    updateWeatherUI(data);
}
catch(error){
    console.error(error);
}
}


//selecting city element


const cityelement=document.querySelector(".city");
const tempelement=document.querySelector(".temp");
const windspeed=document.querySelector(".wind-speed");
const humidity=document.querySelector(".humidity");
const visibility=document.querySelector(".visibility-distance");

const descriptionText=document.querySelector(".description-text");
const date=document.querySelector(".date");
const descriptionIcon=document.querySelector(".description i");


//now time to show data in ui


function updateWeatherUI(data){
    cityelement.textContent=data.name;
    tempelement.textContent='${Math.round(data.main.temp)}';
    windspeed.textContent='${data.wind.speed} km/h';
    humidity.textContent='${data.main.humidity}%';
    visibility.textContent='${data.visibility/1000} Km';
    descriptionText.textContent=data.weather[0].description;
    const currentDate=new Date();
    date.textContent=currentDate.toDateString();
    const weatherIconName= getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML='<i class="material-icons">${weatherIconName}</i>'
}

const formElement=document.querySelector(".search-form");
const inputElement=document.querySelector(".city-input");
formElement.addEventListener('submit',function(e){
   e.preventDefault();


   const city=inputElement.value;
   if(city!=""){
    fetchWeatherData(city);
    inputElement.value="";
   }
});


function getWeatherIconName(weatherCondition){
    const iconMap= {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}