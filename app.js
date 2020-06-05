const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  console.log("Post request");

  const unit = "metric";
  const appid = "8171bd2a117fb11cd7cfeeff81b579ec";
  const query= req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid="+appid+"&units="+unit;;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const cloud = "https://openweathermap.org/img/wn"+icon+"@2x.png";
      //const cloud = "cloud.png";
      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The weather in "+query+" is " + temp + " degree celcius.</h1>");
      res.write("<p>The weather is currently <strong>"+weatherDescription+"</strong></p>");
      res.write("<img src=" +cloud+">");
      res.send();
    })

  });
});

app.listen(2000, function(req, res) {
  console.log("Server starter.");
});
