var apiURL = "";
var dayOfTheWeek = "";
var month = "";
var day = ""; 
var city = "";
var tempFah;
var tempCel;
var tempFahMax;
var tempCelMax;
var tempFahMin;
var tempCelMin;
var iconURLs = {
  "01d":"http://svgshare.com/i/1M0.svg",
  "01n":"http://svgshare.com/i/1Po.svg",
  "02d":"http://svgshare.com/i/1NC.svg",
  "02n":"http://svgshare.com/i/1N2.svg",
  "03d":"http://svgshare.com/i/1P6.svg",
  "03n":"http://svgshare.com/i/1P6.svg",
  "04d":"http://svgshare.com/i/1P6.svg",
  "04n":"http://svgshare.com/i/1P6.svg",
  "09d":"http://svgshare.com/i/1PX.svg",
  "09n":"http://svgshare.com/i/1PX.svg",
  "10d":"http://svgshare.com/i/1Pp.svg",
  "10n":"http://svgshare.com/i/1N3.svg",
  "11d":"http://svgshare.com/i/1PY.svg",
  "11n":"http://svgshare.com/i/1PY.svg",
  "13d":"http://svgshare.com/i/1Nw.svg",
  "13n":"http://svgshare.com/i/1Pf.svg",
  "50d":"https://image.ibb.co/hUG8i5/50d.png",
  "50n":"https://image.ibb.co/itBKqk/50n.png",
};
function fahrenheitToCelsius(temperature) {
  return Math.floor((temperature-32)*5/9);
};

$(document).ready(function() {
  updateWeather();
});
function updateWeather() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=imperial&appid=556ce94308ba8c361cd88c2c8cc30f19";
      console.log(apiURL);
      $.getJSON(apiURL, function(json){
        console.log(JSON.stringify(json));
        city = json.name;
        console.log(json.name);
        var today = new Date();
        var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        dayOfTheWeek = weekDays[today.getDay()];
        day = today.getDate();
        var monthList = new Array();
        monthList[0] = "January";
        monthList[1] = "February";
        monthList[2] = "March";
        monthList[3] = "April";
        monthList[4] = "May";
        monthList[5] = "June";
        monthList[6] = "July";
        monthList[7] = "August";
        monthList[8] = "September";
        monthList[9] = "October";
        monthList[10] = "November";
        monthList[11] = "December";
        month = monthList[today.getMonth()];
        tempFah = json.main.temp;
        tempCel = fahrenheitToCelsius(tempFah);
        tempFahMax = json.main.temp_max;
        tempCelMax = fahrenheitToCelsius(tempFahMax);
        tempFahMin = json.main.temp_min;
        tempCelMin = fahrenheitToCelsius(tempFahMin);
        $("#temperature").html(tempCel);
        
        $("#temp-max").html(tempCelMax+"&#8451");
        $("#temp-min").html(tempCelMin+"&#8451");
        $("#date-location").html("<h3>"+day+" "+month+",</h3><h3>"+dayOfTheWeek+"</h3><h3>In <span style='color:black'>"+city+"</span></h3>");
        $("#weather-icon img").attr("src",iconURLs[json.weather[0].icon]);
        $("#weather-icon span").html(json.weather[0].description);
        $("#wind-speed").html(json.wind.speed+"KM/H");
        $("#humidity").html(json.main.humidity+"%");
      });
    });
  };
 };
 $("#tempUnit").on("click", function(){
    if (document.getElementById("tempUnit").innerHTML == "℃") {
        $("#temperature").html(tempFah);
        $("#tempUnit").html("&#8457")
        $("#temp-max").html(tempFahMax+"&#8457");
        $("#temp-min").html(tempFahMin+"&#8457");
    } else {
        $("#temperature").html(tempCel);
        $("#tempUnit").html("&#8451")
        $("#temp-max").html(tempCelMax+"&#8451");
        $("#temp-min").html(tempCelMin+"&#8451");             
    }
});
$("#temperature").on("click", function(){
  updateWeather();
});