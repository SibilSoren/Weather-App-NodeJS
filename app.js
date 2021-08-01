const getGeoLocation = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];
// console.log(location);
if (location === undefined) {
  console.log("Please enter a location!");
} else if (location.length === 1) {
  console.log("Please enter a location more than 1 character");
} else {
  getGeoLocation(location, (error, data) => {
    if (error) {
      return console.log(error);
    } else {
      forecast(data.longitude, data.latitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        console.log(data.location);
        console.log("data", forecastData);
      });
    }
  });
}
