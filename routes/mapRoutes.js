const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

router.get(
  '/apiv2/getmappoints/:site_id/:project_id/:filename',
  mapController.getMapPoints
);

module.exports = router;
