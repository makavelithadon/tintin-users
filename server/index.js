const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");

app.use(bodyParser());
app.use("/admin", routes);

app.listen(5000);
