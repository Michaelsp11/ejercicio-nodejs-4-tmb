require("dotenv").config();
const chalk = require("chalk");
const { preguntas } = require("./questions/questions");
const {coordenadasMetro, coordenadasMetros} = require("./datos/datosApi");

const init = async () => {
  const respuestas = await preguntas();
  if (respuestas.transporte === "bus") {
    console.log(
      chalk.yellow(
        `No tenemos información disponible sobre los buses ${process.env.URL_API}`
      )
    );
    process.exit(0);
  }
  coordenadasMetros();
};
init();

