const mongoose = require("mongoose");
const URL_DB = process.env.MONGO_CONNECTION;

const dbConnection = async () => {
  console.log("Conectando con la base de datos " + URL_DB);
  try {
    await mongoose.connect(URL_DB);
    console.log("Base de datos online");
  } catch (err) {
    console.log(err);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
