const fs = require("fs");
const parsed = JSON.parse(fs.readFileSync(__dirname + "/config.json", "UTF-8"));
module.exports = {
  app: {
    PORT: 5000
  },
  db: parsed
};
