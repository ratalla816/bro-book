const router = require('express').Router();

const {
  getAllDudes,
  getDudesById,
  createDude,
  updateDude,
  deleteDude,
  addBro,
  deleteBro
} = require('../../controllers/dude-controller');


router.route('/')
  .get(getAllDudes)  .post(createDude);

router.route('/:id')
  .get(getDudesById)  .put(updateDude)  .delete(deleteDude);

// router.route('/:id/bro')
//  .post(addBro) .delete(deleteBro);  

router.route('/:id/broId')
 .post(addBro) .delete(deleteBro);  

module.exports = router;
