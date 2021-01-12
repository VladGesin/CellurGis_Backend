const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartsController');

router.get('/charts', chartController.setChartTable);
router.delete('/chartsdelete', chartController.deleteCharts);
router.get('/getmin', chartController.minChart);
router.get('/getavg', chartController.avgChart);
router.get('/getmax', chartController.maxChart);
router.get('/sitedist/:site_id', chartController.getDistinctBySiteId);
router.get('/countrsrpgreater/:site_id/:rsrp/:dist', chartController.getCountRsrpGreater);
router.get('/countrsrp/:site_id/:dist', chartController.getCountRsrp);
module.exports = router;
