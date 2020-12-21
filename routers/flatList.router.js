const express = require('express');
const router = express.Router();

const controller = require('../controllers/flatList.controller');

router.get('/list_all_foods', controller.index);
router.post('/insert_new_food', controller.insertNewFood);
router.put('/update_a_food', controller.updateAFood);

module.exports = router;
