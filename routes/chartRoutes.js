const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartsController');

router.get('/charts', chartController.setChartTable);
router.delete('/chartsdelete', chartController.deleteCharts);
router.get('/getmin/:site_id/:dist', chartController.minChart);
router.get('/getavg/:site_id/:dist', chartController.avgChart);
router.get('/getmax/:site_id/:dist', chartController.maxChart);
router.get('/sitedist/:site_id', chartController.getDistinctBySiteId);
router.get('/countrsrpgreater/:site_id/:rsrp/:dist', chartController.getCountRsrpGreater);
router.get('/countrsrp/:site_id/:dist', chartController.getCountRsrp);
module.exports = router;
