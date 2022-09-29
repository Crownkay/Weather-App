const WEATHER_API_KEY = '3d6e03e2b7772f1ac6db6f8fdb6e42f4'
// e9959b50c3954b06a2432d84081967b7

export const setLocationObject = (locationObj, coordsObj) => {
  const {
    lat,
    lon,
    name,
    unit
  } = coordsObj;
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};

export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) =>{
  const lat = locationObj.getLat();
  const lon = locationObj.getLon();
  const units = locationObj.getUnit();
  const url = `//https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`

  
  try {
    const weatherStream = await fetch(url);
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    console.log(err);
  }
}

export const getCoordsFromApi = async (entryText, units) => {
  const regex = /^\d+$/g; //look for entry that start and ends with number
  const flag = regex.test(entryText) ? "zip" : "q";
  const url = `//http://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
  
  const encodedUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodedUrl);
    const jsonData = await dataStream.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.log(err.stack)
  }
}

export const cleanText = (text) => {
  const regex = / {2,}/g; // looking for two or more spaces in the row
  const entryText = text.replaceAll(regex, " ").trim(); //this will turn regex to give one space.
  return entryText;
};