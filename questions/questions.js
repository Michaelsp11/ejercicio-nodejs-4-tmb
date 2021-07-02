const inquirer = require("inquirer");

const preguntas = () => {
  const respuestas = inquirer.prompt([
    {
      name: "transporte",
      type: "list",
      message: "¿Que tipo de transporte quieres consultar?",
      choices: [
        {
          name: "Bus",
          value: "bus",
        },
        {
          name: "Metro",
          value: "metro",
        },
      ],
    },
    {
      name: "infoMetro",
      message: "¿Qué información extra quiere obtener de cada parada?",
      type: "checkbox",
      choices: [
        {
          name: "Coordenadas",
          value: "coordenadas",
        },
        {
          name: "Fecha de inauguración",
          value: "fechaInauguracion",
        },
      ],
      when: (respuestas) => respuestas.transporte === "metro",
    },
    {
      name: "errores",
      message: "¿Quiere que le informemos de los errores?",
      type: "list",
      choices: [
        {
          name: "No",
          value: "no"
        },
        {
          name: "Si",
          value: "si"
        }
      ]
    }
  ]);
  return respuestas;
};
module.exports = {
  preguntas,
};
