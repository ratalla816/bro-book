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

// rob id: 6174b7c965ebf1aa8a3feddf

// tomtom1 6174c32c65ebf1aa8a3fede3

// {
//   "_id": "6174c32c65ebf1aa8a3fede3",
//   "username": "tomtom1",
//   "email": "tom@tom.com",
//   "thoughts": [],
//   "friends": [],
//   "friendCount": 0
// },
