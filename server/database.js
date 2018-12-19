const mongoose = require("mongoose");
const { db: dbData } = require("./options");
const { DB_USER, DB_PASSWORD, DB_SERVER, DB_PORT, DB_NAME } = dbData;
const dbURL = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

const chalk = require("chalk");

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.Promise = global.Promise;

//export this function and imported by server.js
module.exports = function() {
  mongoose.connect(
    dbURL,
    options
  );

  mongoose.connection.on("connected", function() {
    console.log(connected("Mongoose default connection is open"));
  });

  mongoose.connection.on("error", function(err) {
    console.log(error("Mongoose default connection has occured " + err + " error"));
  });

  mongoose.connection.on("disconnected", function() {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(termination("Mongoose default connection is disconnected due to application termination"));
      process.exit(0);
    });
  });
};
