const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');
const csvWork = require('../middleware/csvMiddleware.js');
const siteMiddle = require('../middleware/siteMiddleware');
const chartControllr = require('../controllers/chartsController');
const dotMide = require('../middleware/dotMiddleware');
const fileDelete = require('../utils/file-util');
const projectMiddle = require('../middleware/projectMiddleware');
const projectController = require('../controllers/projectController');

// router.post('/api/file/uploadxlsx', upload.single('file'), excelWorker.uploadFile);
router.post(
  '/csv/newproject',
  upload.single('file'),
  csvWork.uploadFile,
  dotMide.updateGeom,
  siteMiddle.UpdateDataBaseFromMongoos,
  projectMiddle.createProjectIndex,
  dotMide.setProjectId,
  dotMide.updateDistFromSites,
  dotMide.updateDistFromRef,
  fileDelete.deleteFile,
  chartControllr.setChartTable
);

router.post(
  '/apiv1/createnewproject',
  projectMiddle.createProjectIndex,
  projectController.addNewProjectToProjectTable
);

router.get(
  '/apiv1/getuserprojects/:user_id',
  projectController.getUserProjects
);

module.exports = router;
