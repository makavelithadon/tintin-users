const fs = require("fs");
const configPath = "./config.json";
const parsed = JSON.parse(fs.readFileSync(configPath, "UTF-8"));
module.exports = {
  app: {
    PORT: 5000
  },
  db: parsed
};
