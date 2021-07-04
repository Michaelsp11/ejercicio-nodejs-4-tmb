require("dotenv").config();
const chalk = require("chalk");
const { program } = require("commander");
const { preguntas, recibirResultados } = require("./questions/questions");
const { coordenadasMetros, paradasMetro } = require("./datos/datosApi");
const { guardarResultado } = require("./utilidades/archivos");

program
  .option("-c,--color <color>", "Color interfaz")
  .option("-a,--abrev", "Abreviar parada");
program.parse(process.argv);
const opciones = program.opts();
const init = async () => {
  let respuestas = await preguntas(opciones.color);
  comprobarRespuestas(respuestas);
  const featuresLinea = await llamarAPILinea(respuestas);
  if (featuresLinea === null) {
    process.exit(0);
  }
  const {
    properties: { NOM_LINIA, DESC_LINIA, COLOR_LINIA },
  } = featuresLinea[0];
  let resultado = getLinea(NOM_LINIA, DESC_LINIA, COLOR_LINIA);
  const { features: featuresEstaciones } = await paradasMetro(respuestas.linea);
  resultado += getEstaciones(featuresEstaciones, respuestas, COLOR_LINIA);
  console.log(resultado);
  respuestas = await recibirResultados(opciones.color);
  if (respuestas.recibirResultados === "si") {
    guardarResultado(resultado);
  }
};
const comprobarRespuestas = (respuestas) => {
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
};
const llamarAPILinea = async (respuestas) => {
  const { totalFeatures, features } = await coordenadasMetros(respuestas.linea);
  if (totalFeatures === 0) {
    if (respuestas.errores === "si") {
      console.log(chalk.red.bold(`La línea ${respuestas.linea} no existe!`));
    }
    return null;
  }
  return features;
};
const getLinea = (nombre, descripcion, color) =>
  opciones.color
    ? chalk.hex(opciones.color)(nombre, descripcion)
    : chalk.hex(`#${color}`)(nombre, descripcion);

const getEstaciones = (estaciones, respuestas, colorLinea) => {
  let resultado = "";
  for (const {
    geometry: { coordinates: coordenadas },
    properties: { NOM_ESTACIO, DATA_INAUGURACIO },
  } of estaciones) {
    resultado += chalk.hex(opciones.color ? opciones.color : `#${colorLinea}`)(
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
    );
  }
  return resultado;
};
init();
