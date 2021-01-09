const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartsController');

router.get('/charts', chartController.setChartTable);
router.delete('/chartsdelete', chartController.deleteCharts);
router.get('/getmin', chartController.minChart);
router.get('/getavg', chartController.avgChart);
router.get('/getmax', chartController.maxChart);
router.get('/sitedist', chartController.getDistinctBySiteId);
module.exports = router;
