const { User, Thought } = require("../models");

// GET All Dudes
// GET Dude by their ID
// ADD new Dude 
// UPDATE a Dude by their id
// DELETE a dude by their id
// DELETE dude's thoughts by id
// ADD bro by id
// DELETE a Bro

const userController = {
  // GET All Dudes
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })

      .populate({
        path: "bros",
        select: "-__v",
      })

      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))

      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // GET Dude by their ID
  getUserById({ params }, res) {
    User.findOne
      (
        {
          _id:
            params.id
        }
      )
      .populate({
        path: "thoughts",
        select: "-__v",
      })

      .populate({
        path: "bros",
        select: "-__v",
      })

      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res

            .status(404).json({ message: "They aren't your bro, dude. They're nobody's bro!" });
          return;
        }
        res.json(dbUserData);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ADD a new dude
  createUser({ body }, res) {

    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // UPDATE dude by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body,
      {
        new: true,
        runValidators: true,
      })

      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404).json({ message: "Bieber!!!" });
          return;
        }
        res.json(dbUserData);
      })

      .catch((err) => res.status(400).json(err));
  },

  // DELETE a dude by their id
  deleteUser(req, res) {
    User.findOneAndDelete
      (
        {
          _id:
            req.params.id
        }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404).json({ message: "BOGUS!" });
        }

        // DELETE dude's thoughts by id
        return Thought.deleteMany
          ({ _id: { $in: dbUserData.thoughts } });
      })

      .then(() => {
        res
          .json({ message: "That bro-it-all's thoughts are toast!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ADD bro by dude id
  addBro(req, res) {
    User.findOneAndUpdate
      (
        { _id: req.params.userId },
        { $addToSet: { bros: req.params.broId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404).json({ message: "NO WAY!" });
        }
        res.json(dbUserData);
      })

      .catch((err) => res.json(err));
  },

  // DELETE bro by id
  removeBro(req, res) {
    User.findOneAndUpdate
      (
        { _id: req.params.userId },
        { $pull: { bros: req.params.broId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res

            .status(404).json({ message: "That's not your bro, dude!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
