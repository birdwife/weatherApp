// so the cards are invisible until you call them :)
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById("card1").style.display="none";
    document.getElementById("card2").style.display="none";
    document.getElementById("card3").style.display="none";
    document.getElementById("card4").style.display="none";
});
// the number of visible cards. Zero to start, then one each time you press submit with a valid entry :)
var numberOfCards = 0;
// so you can submit via the submit button :)
document.getElementById("myBtn").addEventListener("click", function() {
    weatherAPIFunction();
});
// so you can submit via the enter button :)
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});
// fetching information from the API :)
function weatherAPIFunction() {
    var city1 = document.getElementById("myInput").value;
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q="+city1, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "976703a96cmsh55ccea5587e92ccp117b98jsn5e77e613b50d"
	}
})
.then(response => {
    if (response.ok == false) {
        document.getElementById("errorMessage").textContent = "Please enter a valid city";
    } else {
        document.getElementById("errorMessage").textContent = " ";
        document.getElementById("card1").style.display="block";
        numberOfCards=numberOfCards+1;
        if (numberOfCards == 2) {
            document.getElementById("card2").style.display="block";
        }
        if (numberOfCards == 3) {
            document.getElementById("card3").style.display="block";
        }
        if (numberOfCards == 4) {
            document.getElementById("card4").style.display="block";
        }
    }
	response.json().then(data => {
        console.log(data);
        showWeather1(data);
    });
})
.catch(err => {
    console.log(err.message);
});
}
// lists of cities entered and their temperatures and weather descriptions :)
var stackCity = [];
var stackTemp = [];
var stackDesc = [];

// Write to the first card :)

function showWeather1(weatherInfo) {
    var myCity = document.getElementById("myInput").value;
    var myTemp = (weatherInfo.main.temp)-273.15;
    var myTemp2 = myTemp.toFixed(1);
    var myString = myTemp2.toString();
    var myDescription = weatherInfo.weather[0].description;
    document.getElementById("cityTitle1").textContent = myCity;
    document.getElementById("tempNum1").textContent = myString+"\u00B0C";
    document.getElementById("description1").textContent = myDescription;
    // to clear the input space after city is submitted :)
    document.getElementById("myInput").value="";
    // to set the picture according to what the weather is like :)
    if (myDescription == "overcast clouds") {
        document.getElementById("card1Pic").src = "031-hazy.png";
    }
    if (myDescription == "clear sky") {
        document.getElementById("card1Pic").src = "031-sun.png";
    }
    if (myDescription == "few clouds") {
        document.getElementById("card1Pic").src = "031-sun-3.png";
    }
    if (myDescription == "light rain") {
        document.getElementById("card1Pic").src = "031-raindrop.png";
    }
    if (myDescription == "scattered clouds") {
        document.getElementById("card1Pic").src = "031-sun-3.png";
    }
    if (myDescription == "broken clouds") {
        document.getElementById("card1Pic").src = "031-cloudy.png";
    }
    if (myDescription == "thunderstorm") {
        document.getElementById("card1Pic").src = "031-storm-4.png";
    }
    if (myDescription == "smoke") {
        document.getElementById("card1Pic").src = "031-fog.png";
    }
    if (myDescription == "haze") {
        document.getElementById("card1Pic").src = "031-hazy.png";
    }
    if (myDescription == "heavy intensity rain") {
        document.getElementById("card1Pic").src = "031-storm-1.png";
    }
    if (myDescription == "moderate rain") {
        document.getElementById("card1Pic").src = "031-rainy.png";
    }
    if (myDescription == "light intensity shower rain") {
        document.getElementById("card1Pic").src = "031-rainy-1.png";
    }

    // put the new data on the end of the array
    stackCity.push(myCity);
    stackTemp.push(myString);
    stackDesc.push(myDescription);

    // conditions for 2, 3, and 4 visible cards 
    if (numberOfCards == 2) {
        writeToCard2(stackCity[0], stackTemp[0], stackDesc[0]);
    }
    if (numberOfCards == 3) {
        writeToCard3(stackCity[0], stackTemp[0], stackDesc[0]);
        writeToCard2(stackCity[1], stackTemp[1], stackDesc[1]);
    }
    if (numberOfCards == 4) {
        writeToCard4(stackCity[0], stackTemp[0], stackDesc[0]);
        writeToCard3(stackCity[1], stackTemp[1], stackDesc[1]);
        writeToCard2(stackCity[2], stackTemp[2], stackDesc[2]);
    }
 
    // if the user continues to input cities after all four slots are filled, the array shifts left by one element 
    if (numberOfCards > 4) {
        stackCity.shift();
        writeToCard4(stackCity[0], stackTemp[0], stackDesc[0]);
        writeToCard3(stackCity[1], stackTemp[1], stackDesc[1]);
        writeToCard2(stackCity[2], stackTemp[2], stackDesc[2]);
    }
}

// Write to second card :)

function writeToCard2(city2, temp2, desc2){
    document.getElementById("cityTitle2").textContent = city2;
    document.getElementById("tempNum2").textContent = temp2+"\u00B0C";
    document.getElementById("description2").textContent = desc2;
    if (desc2 == "overcast clouds") {
        document.getElementById("card2Pic").src = "031-hazy.png";
    }
    if (desc2 == "clear sky") {
        document.getElementById("card2Pic").src = "031-sun.png";
    }
    if (desc2 == "few clouds") {
        document.getElementById("card2Pic").src = "031-sun-3.png";
    }
    if (desc2 == "light rain") {
        document.getElementById("card2Pic").src = "031-raindrop.png";
    }
    if (desc2 == "scattered clouds") {
        document.getElementById("card2Pic").src = "031-sun-3.png";
    }
    if (desc2 == "broken clouds") {
        document.getElementById("card2Pic").src = "031-cloudy.png";
    }
    if (desc2 == "thunderstorm") {
        document.getElementById("card2Pic").src = "031-storm-4.png";
    }
    if (desc2 == "smoke") {
        document.getElementById("card2Pic").src = "031-fog.png";
    }
    if (desc2 == "haze") {
        document.getElementById("card2Pic").src = "031-hazy.png";
    }
    if (desc2 == "heavy intensity rain") {
        document.getElementById("card2Pic").src = "031-storm-1.png";
    }
    if (desc2 == "moderate rain") {
        document.getElementById("card2Pic").src = "031-rainy.png";
    }
    if (desc2 == "light intensity shower rain") {
        document.getElementById("card2Pic").src = "031-rainy-1.png";
    }
}

// Write to third card :)

function writeToCard3(city3, temp3, desc3){
    document.getElementById("cityTitle3").textContent = city3;
    document.getElementById("tempNum3").textContent = temp3+"\u00B0C";
    document.getElementById("description3").textContent = desc3;
    if (desc3 == "overcast clouds") {
        document.getElementById("card3Pic").src = "031-hazy.png";
    }
    if (desc3 == "clear sky") {
        document.getElementById("card3Pic").src = "031-sun.png";
    }
    if (desc3 == "few clouds") {
        document.getElementById("card3Pic").src = "031-sun-3.png";
    }
    if (desc3 == "light rain") {
        document.getElementById("card3Pic").src = "031-raindrop.png";
    }
    if (desc3 == "scattered clouds") {
        document.getElementById("card3Pic").src = "031-sun-3.png";
    }
    if (desc3 == "broken clouds") {
        document.getElementById("card3Pic").src = "031-cloudy.png";
    }
    if (desc3 == "thunderstorm") {
        document.getElementById("card3Pic").src = "031-storm-4.png";
    }
    if (desc3 == "smoke") {
        document.getElementById("card3Pic").src = "031-fog.png";
    }
    if (desc3 == "haze") {
        document.getElementById("card3Pic").src = "031-hazy.png";
    }
    if (desc3 == "heavy intensity rain") {
        document.getElementById("card3Pic").src = "031-storm-1.png";
    }
    if (desc3 == "moderate rain") {
        document.getElementById("card3Pic").src = "031-rainy.png";
    }
    if (desc3 == "light intensity shower rain") {
        document.getElementById("card3Pic").src = "031-rainy-1.png";
    }
}

// Write to fourth card :)

function writeToCard4(city4, temp4, desc4){
    document.getElementById("cityTitle4").textContent = city4;
    document.getElementById("tempNum4").textContent = temp4+"\u00B0C";
    document.getElementById("description4").textContent = desc4;
    if (desc4 == "overcast clouds") {
        document.getElementById("card4Pic").src = "031-hazy.png";
    }
    if (desc4 == "clear sky") {
        document.getElementById("card4Pic").src = "031-sun.png";
    }
    if (desc4 == "few clouds") {
        document.getElementById("card4Pic").src = "031-sun-3.png";
    }
    if (desc4 == "light rain") {
        document.getElementById("card4Pic").src = "031-raindrop.png";
    }
    if (desc4 == "scattered clouds") {
        document.getElementById("card4Pic").src = "031-sun-3.png";
    }
    if (desc4 == "broken clouds") {
        document.getElementById("card4Pic").src = "031-cloudy.png";
    }
    if (desc4 == "thunderstorm") {
        document.getElementById("card4Pic").src = "031-storm-4.png";
    }
    if (desc4 == "smoke") {
        document.getElementById("card4Pic").src = "031-fog.png";
    }
    if (desc4 == "haze") {
        document.getElementById("card4Pic").src = "031-hazy.png";
    }
    if (desc4 == "heavy intensity rain") {
        document.getElementById("card4Pic").src = "031-storm-1.png";
    }
    if (desc4 == "moderate rain") {
        document.getElementById("card4Pic").src = "031-rainy.png";
    }
    if (desc4 == "light intensity shower rain") {
        document.getElementById("card4Pic").src = "031-rainy-1.png";
    }
}
