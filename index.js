require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const { preguntas } = require("./questions/questions");
const { coordenadasMetros, paradasMetro } = require("./datos/datosApi");

program
  .option("-c,--color <color>", "Color interfaz")
  .option("-a,--abrev", "Abreviar parada");
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
  const { totalFeatures, features: featuresLinia } = await coordenadasMetros(
    respuestas.linea
  );
  if (totalFeatures === 0) {
    if (respuestas.errores === "si") {
      console.log(chalk.red.bold(`La línea ${respuestas.linea} no existe!`));
    }
    process.exit(0);
  }
  const {
    properties: { NOM_LINIA, DESC_LINIA, COLOR_LINIA },
  } = featuresLinia[0];
  pintarLinea(NOM_LINIA, DESC_LINIA, COLOR_LINIA);
  const { features: featuresEstaciones } = await paradasMetro(respuestas.linea);
  pintarEstaciones(featuresEstaciones, respuestas, COLOR_LINIA);
};
const pintarLinea = (nombre, descripcion, color) => {
  console.log(
    opciones.color
      ? chalk.hex(opciones.color)(nombre, descripcion)
      : chalk.hex(`#${color}`)(nombre, descripcion)
  );
};
const pintarEstaciones = (estaciones, respuestas, colorLinea) => {
  for (const estacion of estaciones) {
    const {
      geometry: { coordinates: coordenadas },
      properties: { NOM_ESTACIO, DATA_INAUGURACIO },
    } = estacion;
    console.log(
      chalk.hex(opciones.color ? opciones.color : `#${colorLinea}`)(
        `\nEstación: ${
          opciones.abrev ? `${NOM_ESTACIO.slice(0, 3)}.` : NOM_ESTACIO
        }${
          respuestas.infoExtraMetro.includes("coordenadas")
            ? ` | Coordenadas: ${coordenadas[0]},${coordenadas[1]}`
            : ""
        }${
          respuestas.infoExtraMetro.includes("fechaInauguracion")
            ? ` | Fecha inauguración: ${DATA_INAUGURACIO}`
            : ""
        }`
      )
    );
  }
};
init();
