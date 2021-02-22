const express = require('express');
const router = express.Router();
const dotController = require('../controllers/dotsController');

//Get All Dots
router.get('/dots', dotController.getAllDots);
//Get Dots of Site Name
router.get('/dots/:site_id', dotController.getDotsBySiteName);
//Create Dot
router.post('/dot', dotController.createDot);
//Update dot by id row
router.put('/dot/:id', dotController.updateDot);
//Delete Row
// router.delete('/dot/:id', dotController.deleteDot);
//Delete all rows
router.delete('/dots', dotController.deleteAllRows);

module.exports = router;
