const request = require("postman-request");

const getGeoLocation = (location, callback) => {
  const api_key =
    "pk.eyJ1Ijoic2liaWxzb3JlbiIsImEiOiJja3JtZXkxeWk0NnF1MndwOHh5dDRsMXNrIn0.NiFDLvK3SkYM4c_53ken0Q";
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=${api_key}&limit=1`;
  request({ uri: URL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location server", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the lat and lon, Try another location",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = getGeoLocation;
