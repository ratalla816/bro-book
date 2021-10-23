const { Thoughts, Dudes } = require("../models");


const thoughtsController = {

  // #1 POST a thought
  // #2 GET all thoughts
  // #3 GET a thought by it's id
  // #4 DELETE A thought by it's ID 
  // #5 'PUT' update a thought by it's ID
  // #6 POST a reaction to a thought
  // #7 DELETE a reaction by it's ID
  // #8 'PUT' update a reaction by it's ID

  // #1 POST a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return Dudes.findOneAndUpdate
          (
            { _id: params.dudeId },
            { $push: { thoughts: _id } },
            { new: true }
          );
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {

          res.status(404).json({ message: "BOGUS!" });
          return;
        }
        res.json(dbThoughtData);

      })
      .catch((err) => res.json(err)
      );
  },

  // #2 GET all thoughts
  getAllThought(req, res) {
    Thought.find({})

      .populate({
        path: "thoughts",
        select: "-__v"
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {

        console.log(err);

        res.status(500).json(err);
      }
      );
  },

  //  #3 GET a thought by it's id
  getThoughtById({ params }, res) {
    Thought.findOne(
      {
        _id:
          params.id
      })
      .populate({
        path: "thoughts",
        select: "-__v"
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "GNARLY!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      }
      );
  },

  // #4 DELETE A thought by it's ID 
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete(
      {
        _id:
          params.id
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "NO WAY!" });

          return;
        }
        res.json(dbThoughtData);
      })

      .catch((err) => res.status(400).json(err)
      );
  },

  // #5 'PUT' update a thought by it's ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id:
          params.id
      },

      body,
      {
        new: true,
        runValidators: true,
      })

      .populate(
        {
          path: "thoughts",
          select: "-__v"
        })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "If you're here, and I'm here, doesn't it make it OUR time?" });
          return;
        }

        res.json(dbThoughtData);
      })

      .catch((err) => res.json(err)
      );
  },

  //  #6 POST a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id:
          params.thoughtId
      },

      {
        $push:
          { reactions: body }
      },
      {
        new: true,
        runValidators: true
      })

      .populate({
        path: "reactions",
        select: "-__v"
      })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "Pitted, so pitted!" });
          return;
        }
        res.json(dbThoughtData);
      })

      .catch((err) => res.status(400).json(err)
      );
  },

  // #7 DELETE a reaction by it's ID
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      {
        _id:
          params.thoughtId
      },

      {
        $pull:
        {
          reactions:
            { reactionId: params.reactionId }
        }
      },
      { new: true }
    )
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Bieber!!!" });
          return;
        }
        res.json(dbThoughtData);
      })

      .catch((err) => res.status(400).json(err)
      );
  },

  // #8 'PUT' update a reaction by it's ID
  updateReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id
      }, body, {
      new: true, runValidators: true,
    })

      .populate(
        {
          path: "reactions",
          select: "-__v"
        })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "If you're here, and I'm here, doesn't it make it OUR time?" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;