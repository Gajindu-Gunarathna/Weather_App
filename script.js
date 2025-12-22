const API_KEY = ""
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

//fetching html elemts
const cityInput = document.getElementsById("cityInput")
const searchbtn = document.getElementById("searchbtn")
const weatherDisplay = document.getElementById("weatherDisplay")
const loading = document.getElementById("weatherDisplay")
const error = document.getElementById("error")
const errorMessage = document.getElementById("errorMessage")

// weather display elemets
const CityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")
const weatherDescription = document.getElementById("weatherDescription")
const feelslike = document.getElementById("feelslike")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("windSpeed")

//Events
searchbtn.addEventListener("click", handleSearch)
cityInput.addEventListener("keypress",(event)=>{
    if(event.key === "Enter"){
        handleSearch()
    }
})

//functions
function handleSearch(){
    const city= cityInput.value.trim()
    
    if(!city){
        showError("Please Enter a City Name")
        return
    }

    hideAllSections()
    showLoading()

    fetchWeatherData(city)
}