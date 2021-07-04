const fetch = require("node-fetch");

const coordenadasMetros = async (linia) => {
  const response = await fetch(
    `${process.env.URL_METRO}${linia}?app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

module.exports = {
  coordenadasMetros,
};
