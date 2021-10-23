const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
  updateReaction
} = require('../../controllers/thoughts-controller');

// router.route('/')
// .get(getAllThoughts);

router.route('/:dudeId')
.post(createThought);

router.route('/:id')
.get(getThoughtById) .put(updateThought) .delete(deleteThought); 

router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.put(updateReaction) .delete(deleteReaction);

module.exports = router;