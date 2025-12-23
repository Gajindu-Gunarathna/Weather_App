const API_KEY = "56b314638acf037d7c049a3aa1b6e781"
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

//fetching html elemts
const cityInput = document.getElementById("cityInput")
const searchbtn = document.getElementById("searchbtn")
const weatherDisplay = document.getElementById("weatherDisplay")
const loading = document.getElementById("loading")
const error = document.getElementById("error")
const errorMessage = document.getElementById("errorMessage")

// weather display elemets
const CityName = document.getElementById("cityName")
const temperature = document.getElementById("temperature")
const weatherDescription = document.getElementById("weatherDescription")
const feelslike = document.getElementById("feelsLike")
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

//fecth weatherdat
async function  fetchWeatherData(city) {
    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        const response = await fetch(url)
        if(!response.ok){
            if(response.status === 404){
                throw new Error("City Not Found and please enter a valid city name")
            }else if(response.status === 401){
                throw new Error("Invalid API Key")
            }else{
                throw new Error("Failed To Fecth Error Data")
            }
        }

        //prase the json
        const data = await response.json()
        displayWeatherData(data)
    } catch (error) {
        console.error("Error fetching weather data:", error)
        hideLoading()
        showError(error.message)
    }    
}


//Display 
function displayWeatherData(data){
    hideLoading()
    const cityNamText= `${data.name}, ${data.sys.country}`
    const temp = Math.round(data.main.temp)
    const description = data.weather[0].description
    const feelslikeTemp = Math.round(data.main.feels_like)
    const humidityValue = data.main.humidity
    const windSpeedValue = Math.round(data.wind.speed)

    CityName.textContent = cityNamText
    temperature.textContent = temp
    weatherDescription.textContent = description
    feelslike.textContent = feelslikeTemp
    humidity.textContent = humidityValue 
    windSpeed.textContent = windSpeedValue

    showWeatherDisplay()
}

function showWeatherDisplay(){
    weatherDisplay.classList.remove("hidden")
}

function hideAllSections(){
    hideLoading()
    hideError()
    hideWeatherDisplay()
}



function showLoading(){
    loading.classList.remove("hidden")
}

function hideLoading(){
    loading.classList.add("hidden")
}

function hideWeatherDisplay(){
    weatherDisplay.classList.add("hidden")
}

/**
 * Show Error Message
 * @param {string} message 
 */
function showError(message){
    errorMessage.textContent = message
    error.classList.remove("hidden")
}

function hideError(){
    error.classList.add("hidden")
}


function clearInput(){
    cityInput.value = ""
}

function testwithSampleData(){
    const sampleData = {
        name: "London",
        sys: { country: "GB" },
        main: {
            temp: 15.5,
            feels_like: 13.2,
            humidity: 78,
        },
        weather: [{ description: "partly cloudy" }],
        wind: { speed: 3.5 },
    }

    displayWeatherData(sampleData)
}

