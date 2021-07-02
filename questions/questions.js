const inquirer = require("inquirer");

const preguntas = () => {
  inquirer.prompt([
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
  ]);
};
module.exports = {
  preguntas,
};
