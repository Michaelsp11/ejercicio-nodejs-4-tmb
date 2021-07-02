const fetch = require('node-fetch');


const coordenadasMetros = async () =>{
    const response = await fetch(`${process.env.URL_METRO}app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`);
    const data = await response.json(); 
    console.log(data);

}

module.exports = {
  coordenadasMetros,
};
