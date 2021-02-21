const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartsController');

router.get(
  '/apiv1/getsitedistances/:site_id/:project_id/:filename/:table',
  chartController.getDistinctBySiteId
);

router.get(
  '/apiv1/getmaxrsrpdistance/:site_id/:dist/:project_id/:filename/:table',
  chartController.maxChart
);

router.get(
  '/apiv1/getminrsrpdistance/:site_id/:dist/:project_id/:filename/:table',
  chartController.minChart
);
router.get(
  '/apiv1/getavgrsrpdistance/:site_id/:dist/:project_id/:filename/:table',
  chartController.avgChart
);

router.get(
  '/apiv1/countrsrpgreater/:site_id/:rsrp/:dist/:project_id/:filename/:table',
  chartController.getCountRsrpGreater
);
router.get(
  '/apiv1/countrsrp/:site_id/:dist/:project_id/:filename/:table',
  chartController.getCountRsrp
);
module.exports = router;
