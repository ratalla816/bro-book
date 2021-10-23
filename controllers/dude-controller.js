const { Dudes } = require('../models');

const dudeController = {

  // POST a new dude
  // GET All Dudes
  // GET Dude by their ID
  // 'PUT' update a Dude by their id
  // DELETE a dude by their id
  // DELETE a Bro

  // POST a new dude
  createDude({ body }, res) {
    Dudes.create(body)

      .then(dbDudesData => res.json(dbDudesData))
      .catch(err => res.status(400).json(err));
  },

  // GET All Dudes
  getAllDudes(req, res) {
    Dudes.find({})
      .populate(
        {
          path: 'thoughts',
          select: '-__v'
        })

      .populate(
        {
          path: 'bros',
          select: '-__v'
        })
      .select('-__v')

      .then(dbDudesData => res.json(dbDudesData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET Dude by their ID
  getDudesById({ params }, res) {
    Dudes.findOne(
      {
        _id:
          params.id
      })

      .populate(
        {
          path: 'thoughts',
          select: '-__v'
        })

      .populate(
        {
          path: 'bros',
          select: '-__v'
        })

      .select('-__v')
      .then(dbDudesData => {
        if (!dbDudesData) {
          res.status(404).json({ message: "That's not your bro, dude!" });
          return;
        }
        res.json(dbDudesData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // 'PUT' update a Dude by their id
  updateDude({ params, body }, res) {
    Dudes.findOneAndUpdate(
      {
        _id:
          params.id
      },

      body,
      {
        new: true,
        runValidators: true
      })

      .select('-__v')
      .then(dbDudesData => {
        if (!dbDudesData) {

          res.status(404).json({ message: "That's not your dude, Bro!" });
          return;
        }
        res.json(dbDudesData);
      })
      .catch(err => res.json(err));
  },

  deleteDude({ params }, res) {

    Dudes.findOneAndDelete(
      {
        _id:
          params.id
      })

      .select('-__v')
      .then(dbDudesData => {
        if (!dbDudesData) {

          res.status(404).json({ message: "That's not your bro, dude!" });
          return;
        }
        res.json(dbDudesData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE a dude by their id
  addBro({ params }, res) {
    Dudes.findOneAndUpdate(
      {
        _id:
          params.id
      },

      {
        $push:
        {
          bros:
            params.broId
        }
      },

      { new: true })

      .populate(
        {
          path: 'bros',
          select: ('-__v')
        })

      .select('-__v')
      .then(dbDudesData => {
        if (!dbDudesData) {

          res.status(404).json({ message: "That's not your dude, Bro!" });
          return;
        }
        res.json(dbDudesData);
      })
      .catch(err => res.json(err));
  },

  // DELETE a Bro
  deleteBro({ params }, res) {

    Dudes.findOneAndUpdate(
      {
        _id:
          params.id
      },

      {
        $pull:
        {
          bros:
            params.broId
        }
      },
      { new: true })

      .populate(
        {
          path: 'bros',
          select: '-__v'
        })

      .select('-__v')

      .then(dbDudesData => {
        if (!dbDudesData) {
          res.status(404).json({ message: "That's not your bro, dude!" });
          return;
        }
        res.json(dbDudesData);
      })
      .catch(err => res.status(400).json(err));
  }

};

module.exports = dudeController;
