const options = require("./options");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const db = require("./database");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/admin", routes);

app.listen(options.app.PORT);
