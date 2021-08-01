const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const api = {
    key: "1cc2ac2df84bd0ff3054e46f282eddce",
    url: "http://api.weatherstack.com/current?",
  };

  request(
    `${api.url}access_key=${api.key}&query=${long},${lat}&units=m`,
    (error, response, body) => {
      const data = JSON.parse(body);
      if (error) {
        callback("Unable to connect to weather server", undefined);
      } else if (data.error) {
        callback(
          "Unable to find the location, Try another location",
          undefined
        );
      } else {
        callback(undefined, {
          description: data.current.weather_descriptions[0],
          temperature: data.current.temperature,
          feelslike: `${data.current.feelslike}\xB0c`,
        });
        // console.log(
        //   `${data.current.weather_descriptions[0]},The temperature is ${data.current.temperature}\xB0c and it it feels like ${data.current.feelslike}\xB0c.`
        // );
      }
    }
  );
};

module.exports = forecast;
