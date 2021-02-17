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
  '/apiv1/csv/newproject',
  upload.single('file'),
  csvWork.uploadFile,
  fileDelete.deleteFile,
  dotMide.updateGeom,
  siteMiddle.UpdateDataBaseFromMongoos,
  dotMide.setProjectId,
  dotMide.updateDistFromSites,
  dotMide.updateDistFromRef,
  dotMide.updateCsvFileName,
  projectController.fileUpload
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

router.get(
  '/apiv1/projectfilenames/:project_id',
  projectController.getFileNmaes
);
router.delete(
  '/apiv1/deleteproject',
  projectMiddle.saveDeletedIndex,
  dotMide.deleteProjectData,
  projectController.deleteProject
);

module.exports = router;
