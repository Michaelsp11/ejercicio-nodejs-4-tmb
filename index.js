require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const { preguntas } = require("./questions/questions");

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
};
init();
