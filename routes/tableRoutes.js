const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get(
  '/apiv1/getfilesites/:project_id/:filename',
  tableController.getFileSites
);

router.get(
  '/apiv2/getfilesdata/:project_id/:filename',
  tableController.getFileData
);

router.get(
  '/apiv1/getcountpoints/:project_id/:filename',
  tableController.getFileCountPoints
);

router.delete('/apiv1/deletefile', tableController.deleteTable);

module.exports = router;
