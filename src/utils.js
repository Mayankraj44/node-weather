const request = require("request");

const getLocation = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiaGFycnkzMiIsImEiOiJja3lrY3kxZXEyZTYxMnVxaHYyNDBzMzdwIn0.m3mLdB9lGI42cKEvOntu5Q`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      // console.log("Not able to connect");
      callback({ error: "Not able to connect" });
    } else if (!response.body.features[0]) {
      // console.log("Something is wrong with location name");
      callback({
        error: "Something is wrong with location name",
      });
    } else {
      console.log("reponse", response.body);
      const latitude = response.body.features[0].center[0];
      const longitude = response.body.features[0].center[1];
      getWeather(latitude, longitude, callback);
    }
  });
};

const getWeather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8f168824df1373547a5d2304f6066a4a&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      // console.log("Unable to Connect");
      callback({ error: "Not able to connect" });
    } else if (response.body.error) {
      // console.log(response.body.error.info);
      callback({
        error: "Something is wrong with location",
      });
    } else {
      const data = response.body.current;
      console.log(
        `it is currently ${data.temperature} degrees out .It fels like there is ${data.feelslike} % chances of rain`
      );
      callback({
        data,
      });
    }
  });
};

module.exports = { getLocation, getWeather };
