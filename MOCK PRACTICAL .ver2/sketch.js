//I am trying to make it so that users of my html,
// could imput the city they want and it would link to accurate weather conditions
//For that I need to somehow connect open-meteo-
//Geocoding API with Weather API


/* Tried using fetch. Realized I don't understand the function
var cityinput = window.prompt("Type city here");
class Fetch {
  async getCurrent(cityinput) {

      //make request to url
      var cityinput = window.prompt("Type city here");
      const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityinput}&count=1`
      );
      const data = await response.json();
      console.log(data);
      return data;
  }
}*/

//tps://geocoding-api.open-meteo.com/v1/search?name=CITYNAME&count=1
//have to provide correct city name
//decided to follow a tutorial from the coding train
var weather;
var geo;
var geourl;
let weatherurl;
let geolon, geolat;

//let apidate = `${yr}-${m}-${d}`;
//let m = month();//built in p5js function, gives numerical month
//let d = day(); for later

let geoapi = "https://geocoding-api.open-meteo.com/v1/search?";
let cityname = `name=${input.value()}`;
let count = "&count=1";
/*if(geo===true){
let geolon = geo.latitude;
let geolat = geo.longitude;
}*/
let weatherapi = "https://api.open-meteo.com/v1/forecast?"; 
var latitude = `latitude=${geolon}`;
var longitude = `&longitude=${geolat}`; 
var stuff = "&daily=temperature_2m_max,snowfall_sum&timezone=auto&start_date=2022-11-25&end_date=2022-11-25";

var input;

function setup() {
  createCanvas(400,200);

  var button = select("#submit");
  button.mousePressed(geoAsk);
  input = select("#city");
  //input = select("#latitude");
  //input = select("#longitude");
}
function geoAsk() {
  var geourl = geoapi + input.value() + count;
  loadJSON(geourl, gotData);
}

function weatherAsk() { 
  var weatherurl = weatherapi + latitude + longitude + stuff;
  loadJSON(weatherurl, gotData);
}

function gotData(data) {
  geo = data;
  if(geo===true){
    let geolon = geo.latitude;
    let geolat = geo.longitude;
    weather = data;
    console.log("Success");
  } else {
    return
  }
}


function draw(){
   background(200);
   if (weather){
    var temp = weather.daily.temperature_2m_max;
    var snow = weather.daily.snowfall_sum;
    //var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(200, 100, snow, snow);
   }
}


//https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&daily=temperature_2m_max,snowfall_sum&timezone=auto&start_date=2022-11-25&end_date=2022-11-25