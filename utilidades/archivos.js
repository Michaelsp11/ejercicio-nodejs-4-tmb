const fs = require("fs");
const chalk = require("chalk");

const guardarResultado = (resultado) =>
  fs.writeFile(`${__dirname}/../textos/paradas.txt`, resultado, (err) => {
    if (err) {
      console.log(
        chalk.red.bold(
          `No se ha podido crear o modificar el archivo ${err.message}`
        )
      );
      process.exit(1);
    }
    console.log(
      chalk.green(
        "Archivo se ha guardado correctamente y el saludo se ha guardado correctamente en su interior"
      )
    );
  });
module.exports = {
  guardarResultado,
};
