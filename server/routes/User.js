const { User } = require("./../models");
const { User: UserController } = require("./../controllers");
const utils = require("./../utils/index");
const { verifyToken } = utils.jwt;

module.exports = router => {
  router.post("/register", UserController.register);

  router.get("/users", verifyToken, UserController.getAll);

  router.get("/users/:id", verifyToken, UserController.findById);

  router.post("/login", UserController.login);
};
