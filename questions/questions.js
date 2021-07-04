const inquirer = require("inquirer");
const chalk = require("chalk");

const preguntas = (color, abrev) => {
  const respuestas = inquirer.prompt([
    {
      name: "transporte",
      type: "list",
      message: !color
        ? "¿Que tipo de transporte quieres consultar?"
        : chalk.hex(color)("¿Que tipo de transporte quieres consultar?"),
      choices: [
        {
          name: !color ? "Bus" : chalk.hex(color)("Bus"),
          value: "bus",
        },
        {
          name: !color ? "Metro" : chalk.hex(color)("Metro"),
          value: "metro",
        },
      ],
    },
    {
      name: "infoMetro",
      message: !color
        ? "¿Qué información extra quiere obtener de cada parada?"
        : chalk.hex(color)(
            "¿Qué información extra quiere obtener de cada parada?"
          ),
      type: "checkbox",
      choices: [
        {
          name: !color ? "Coordenadas" : chalk.hex(color)("Coordenadas"),
          value: "coordenadas",
        },
        {
          name: !color
            ? "Fecha de inauguración"
            : chalk.hex(color)("Fecha de inauguración"),
          value: "fechaInauguracion",
        },
      ],
      when: (respuestas) => respuestas.transporte === "metro",
    },
    {
      name: "errores",
      message: !color
        ? "¿Quiere que le informemos de los errores?"
        : chalk.hex(color)("¿Quiere que le informemos de los errores?"),
      type: "list",
      choices: [
        {
          name: !color ? "No" : chalk.hex(color)("No"),
          value: "no",
        },
        {
          name: !color ? "Si" : chalk.hex(color)("Si"),
          value: "si",
        },
      ],
      when: (respuestas) => respuestas.transporte === "metro",
    },
    {
      name: "linea",
      type: "number",
      message: !color
        ? "¿Qué línea quiere consultar?"
        : chalk.hex(color)("¿Qué línea quiere consultar?"),
      when: (respuestas) => respuestas.transporte === "metro",
    },
  ]);
  return respuestas;
};
module.exports = {
  preguntas,
};
