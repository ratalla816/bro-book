const router = require("express").Router();

const {

  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addBro,
  removeBro,
  
} = require("../../controllers/user-controller");

router.route("/")
.get(getAllUser)
.post(createUser);

router.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/bros/:broId")
.post(addBro)
.delete(removeBro);

module.exports = router;
