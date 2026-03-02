function Temperature(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("input").value + "&APPID=ae54cdc166f7903d568c4b7ebc4397b2", true);
    xhr.onload = function(){
        // Todays weather?
        var data = JSON.parse(xhr.response);
        document.getElementById("avgTemp").textContent = (data.main.temp-273).toFixed(2) + "C";
        document.getElementById("minTemp").textContent = "Min.Temp: " + (data.main.temp_min-273).toFixed(2) + "C";
        document.getElementById("maxTemp").textContent = "Max.Temp: " + (data.main.temp_max-273).toFixed(2) + "C";
        document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
        document.getElementById("clouds").textContent = "Clouds: " + data.clouds.all + "%";
        document.getElementById("windspeed").textContent = "Wind Speed: " + data.wind.speed + "m/s";
        document.getElementById("rain").textContent = "Rain: " + (data.rain ? data.rain["1h"] + "mm" : "0mm");
        console.log(data);
        
        var week = new XMLHttpRequest();
        week.open("GET", "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&APPID=ae54cdc166f7903d568c4b7ebc4397b2", true);
        week.onload = function(){
            var weekData = JSON.parse(week.response);
            console.log(weekData.list);
            // THE FORECAST CODE
            document.getElementById("firstDay").textContent = (weekData.list[0].main.temp - 273).toFixed(1) + "C";
            document.getElementById("secondDay").textContent = (weekData.list[8].main.temp - 273).toFixed(1) + "C";
            document.getElementById("thirdDay").textContent = (weekData.list[16].main.temp - 273).toFixed(1) + "C";
            document.getElementById("fourthDay").textContent = (weekData.list[24].main.temp - 273).toFixed(1) + "C";
            document.getElementById("fifthDay").textContent = (weekData.list[32].main.temp - 273).toFixed(1) + "C";
            
            console.log(weekData.list[0].pop);
             //ADDITIONAL STUFF. I DID THIS FOR FUN LOL . AM I JOBLESS ? SHIT 
             var visibility = (data.visibility/1000).toFixed(1);
             var numVis = Number(visibility);
             // Debugging cause im stupid. asked chat gpt and it said i forgot to covert string to number and asked me to check. Turns out it was right lol
             console.log(typeof visibility, numVis);
             if (numVis <= 1) {
                document.getElementById("visibility").textContent = "Today the visibility is " + visibility + "km. Do not go outside!";
             }
             else if(numVis <= 5){
                document.getElementById("visibility").textContent = "Today the visibility is " + visibility + "km. It's a bit foggy, but otherwise ok!";
             }
             else if(numVis <= 10){
                document.getElementById("visibility").textContent = "Today the visibility is " + visibility + "km. Good!";
             }
             else{
                document.getElementById("visibility").textContent = "Today the visibility is " + visibility + "km. Pretty good day for a jog or drive!";
             }

             // OK NOW THAT IM DONE WITH THIS TO MAKE MY LIFE EVEN MORE MISERABLE ILL ADD UV INDEX , WIND DIRECTION AND AIR PRESSURE CAUSE WHY NOT WITH ANOTHER API !
             // OPEN METEO HERE WE GO !!! HOPE I DONT REGRET IT. OOPS SPOKE TO SOON.
             
            var meteoDat = new XMLHttpRequest();
             meteoDat.open("GET", "https://api.open-meteo.com/v1/forecast?latitude=" + data.coord.lat + "&longitude=" + data.coord.lon + "&daily=uv_index_max,precipitation_probability_max&current=is_day,wind_direction_10m" ,true);
             meteoDat.onload = function(){
            var metData = JSON.parse(meteoDat.response);
                console.log(metData);
                // UV INDEX CODE
                 var uvIndex = metData.daily.uv_index_max[0] + " ";
                 // WHY NOT ?
                 var numDEX = Number(uvIndex);
                  if(numDEX <= 2){
                    document.getElementById("uvIndex").textContent = " Today's UV Index is " + uvIndex + "which is totally safe. Go outside and get some air!";
                  }
                  else if(numDEX <= 4){
                    document.getElementById("uvIndex").textContent = "Today's UV Index is " + uvIndex + "which is low.You can go outside";
                  }
                  else if(numDEX <= 6.5){
                    document.getElementById("uvIndex").textContent = "Today's UV Index is " + uvIndex + "which is a bit high. Just wear some sunscreen and you'll be fine";
                  }
                  else if(numDEX <= 8){
                    document.getElementById("uvIndex").textContent = "Today's UV Index is " + uvIndex + "which is very high.Be careful";
                  }
                  else{
                    document.getElementById("uvIndex").textContent = "Today's UV Index is " + uvIndex + "which is dangerously high. Stay indoors if possible!";
                  }

                  document.getElementById("prepProb").textContent = "Chance of Rain:" + metData.daily.precipitation_probability_max[0] + "%";
                  
                  // Ladies and Gentlemen , Im gonna do this da fancy way cause I just saw a British movie (UI) Check the Html Code

                  var windDeg = weekData.list[0].wind.deg;
                  var windDir = "";
                  if(windDeg >= 337.5 || windDeg < 22.5){
                    windDir = "North";
                  }
                  else if(windDeg >= 22.5 && windDeg < 67.5){
                    windDir = "North East";
                  }
                  else if(windDeg >= 67.5 && windDeg < 112.5){
                    windDir = "East";
                  }
                  else if(windDeg >= 112.5 && windDeg < 157.5){
                    windDir = "South East";
                  }
                  else if(windDeg >= 157.5 && windDeg < 202.5){
                    windDir = "South";
                  }
                  else if(windDeg >= 202.5 && windDeg < 247.5){
                    windDir = "South West";
                  }
                  else if(windDeg >= 247.5 && windDeg < 292.5){
                    windDir = "West";
                  }
                  else{
                    windDir = "North West";
                  }      
                  console.log(windDir);
                  document.getElementById("windDirection").textContent = windDir;
                  //Atmospheric Pressure why not ?
                  var hPa = weekData.list[0].main.pressure;
                  var numhPa = Number(hPa);
                  console.log(numhPa);
                  document.getElementById("hPa").textContent = numhPa + "hPa";
                  // OKAY SO IM THINKING OF ADDING ANOTHER API !!!! TO GET HYPERLOCAL AIR QUALITY DATA. CALL ME INSANE BUT  IM SEROIUSLY CONSIDERING IT
                  // AIR QUALITY API BENEATH
                  var aqiDat = new XMLHttpRequest();
                  aqiDat.open("GET", "http://api.waqi.info/feed/" + data.name + "/?token=c1aa3323311468a87ea96886fa44fb25322b6e6f", true);
                  aqiDat.onload = function(){
                    var aqiDATA = JSON.parse(aqiDat.response);
                    console.log(aqiDATA);
                    var numAQI = Number(aqiDATA.data.aqi);
                        document.getElementById("API").textContent = numAQI;

                        //DESCRIPTION OF AQI
 
                    if(numAQI <= 50){
                       document.getElementById("aqiDes").textContent = "Air quality is considered satisfactory, and air pollution poses little or no risk";
                    }    
                    else if(numAQI <= 100){
                       document.getElementById("aqiDes").textContent = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution";
                    }
                    else if(numAQI <= 150){
                       document.getElementById("aqiDes").textContent = "Members of sensitive groups may experience health effects. The general public is not likely to be affected";
                    }
                    else if(numAQI <= 200){
                       document.getElementById("aqiDes").textContent = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects";
                    }
                    else if(numAQI <= 300){
                       document.getElementById("aqiDes").textContent = "Health warnings of emergency conditions. The entire population is more likely to be affected.";
                    }
                    else{
                       document.getElementById("aqiDes").textContent = "Health alert: everyone may experience more serious health effects";
                    }
                  }
                    var newsxhr = new XMLHttpRequest();
                      var today = new Date();
                      var day = today.getDay();
                       var month = today.getMonth();
                       var year = today.getFullYear();
                       var fdate = day + "-" + month + "-" + year;
                       console.log(fdate);
                    newsxhr.open("GET","https://content.guardianapis.com/search?q="+data.name+",weather OR climate change&order-by=relevance&fromdate=2026-02-21&api-key=43c5ea1c-1907-49a7-8e8a-94998308d96b&show-fields=bodyText&format=json" ,true);
                    newsxhr.onload = function(){
                       var newsdat = JSON.parse(newsxhr.response);
                       console.log(newsdat);
                       var url = newsdat.response.results[0].fields.bodyText;
                       console.log(url);
                       document.getElementById("news").textContent = url;
                    }
                    newsxhr.send();
                  
                aqiDat.send();
          }
             meteoDat.send();
    }         
        week.send();
    }
    xhr.send();
}
// DAYS CODE
            var days = [];
            for (var i = 1; i <= 5; i++) {
            var nextDay = new Date(); // Start with a fresh copy of "today"
            nextDay.setDate(nextDay.getDate() + i);
            days.push(nextDay); 
            var dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
            document.getElementById("days").textContent += dayName + " ";
            }
 // API KEY FOR LATER 
// ALSO IM THINKING OF CREATING A BUTTON TO DOWNLOAD ALL THE WEATHER DATA DIRECTLY ONTO THE KINDLE.
// Probably should be possible.
function reload(){
  window.location.reload();
}

