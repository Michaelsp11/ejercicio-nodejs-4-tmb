require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const { preguntas } = require("./questions/questions");
const { coordenadasMetros } = require("./datos/datosApi");

program
  .option("-c,--color <color>", "Color interfaz")
  .option("-a,--abrev <abrev>", "Abreviar parada");
program.parse(process.argv);
const opciones = program.opts();
const init = async () => {
  const respuestas = await preguntas(
    opciones.color ? opciones.color : false,
    !!opciones.abrev
  );
  if (respuestas.transporte === "bus") {
    console.log(
      chalk.yellow(
        `No tenemos información disponible sobre los buses ${process.env.URL_API}`
      )
    );
    process.exit(0);
  }
  if (isNaN(respuestas.linea)) {
    console.log(
      chalk.red.bold(
        `Error. No ha seleccionado ninguna linea o ha escrito carácteres alfanuméricos. Vuelva a ejecutar el programa.`
      )
    );
    process.exit(0);
  }
  const { totalFeatures, features } = await coordenadasMetros(respuestas.linea);
  if (totalFeatures === 0) {
    if (respuestas.errores === "si") {
      console.log(chalk.red.bold(`La línea ${respuestas.linea} no existe!`));
    }
    process.exit(0);
  }
};
init();
