
const weather={
    'temperature':{
                value:'0',
                unit:'',
            },
            description:'cloudy',
            city:'',
            country:'unknown',
            iconid:'1010'
};

const kelvin=273
const apiKey="7bda5d43d8b191ecb16377742a36c473"
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else
{
    notification.style.visiblity="visible"
    notification.innerHTML="Location access is not available"
}
function setPosition(position)
{
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    weatherFetch(latitude,longitude)

}
function showError(message)
{
    notification.innerHTML=`${message.message}`
    notification.style.visibility="visible"
}
function weatherFetch(latitude,longitude)
{
        let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        fetch(api)
        .then((response)=>{
            let data=response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value=Math.floor(data.main.temp-kelvin);
            weather.description=data.weather[0].description;
            weather.iconid=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;
        })
        .then(()=>{
            showWeather();
        })
        
}
function showWeather()
{
    let temp=weather.temperature.value;
    document.getElementById('temperature').innerHTML=`${temp} <span>°C</span>`;
    document.getElementById('description').innerHTML=`${weather.description}`;
    document.getElementById('your-location').innerHTML=`${weather.city},${weather.country}`;
    document.getElementById('weather-pic').innerHTML=`<img class="img-responsive" src="./animated/${weather.iconid}.svg" alt="weather not known">`;


}
