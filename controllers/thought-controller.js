const { Thought, User } = require("../models");

// #1 GET all thoughts
// #2 GET a thought by it's id
// #3 POST a thought
// #4 'PUT' update a thought by it's ID
// #5 DELETE A thought by it's ID 
// #6 POST a reaction to a thought
// #7 DELETE a reaction by it's ID

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})

      .select("-__v")
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //  GET a thought by it's id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {

          return res
            .status(404).json({ message: "If you're here, and I'm here, doesn't it make it OUR time?" });
        }
        res.json(dbThoughtData);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //  POST a thought
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)

      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })

      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "NO WAY!" });
          return;
        }
        res.json(dbUserData);
      })

      .catch((err) => res.json(err));
  },

  // 'PUT' update a thought by it's ID
  updateThought(req, res) {
    Thought.findOneAndUpdate
    (
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404).json({ message: "GNARLY!" });
        }
        res.json(dbThoughtData);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

 // DELETE A thought by it's ID 
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {

        if (!deletedThought) {
          return res.status(404).json({ message: "Pitted, so pitted!" });

        }
        return User.findOneAndUpdate
        (
          { _id: params.userId },
          { $pull: { thoughts: params.commentId } },
          { new: true }
        );
      })

      .then((dbUserData) => {
        if (!dbUserData) {

          res.status(404).json({ message: "That's not your dude, Bro!" });
          return;
        }
        res.json(dbUserData);
      })

      .catch((err) => res.json(err));
  },

  // POST a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate
    (
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404).json({ message: "Bieber!!!" });
        }
        res.json(dbThoughtData);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // DELETE a reaction by it's ID
  removeReaction(req, res) {
    Thought.findOneAndUpdate
    (
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404).json({ message: "If you're here, and I'm here, doesn't it make it OUR time?" });
        }
        res.json(dbThoughtData);
      })
      
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
