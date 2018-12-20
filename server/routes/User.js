const { User } = require("./../models");
const { User: UserController } = require("./../controllers");
const utils = require("./../utils/index");
const { verifyToken } = utils.jwt;

module.exports = router => {
  router.post("/register", UserController.register);

  router.post("/login", UserController.login);

  router.get("/users/:id", verifyToken, UserController.findById);

  router.get("/users", verifyToken, UserController.getAll);
};
