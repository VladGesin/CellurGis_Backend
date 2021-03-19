const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');
const csvWork = require('../middleware/csvMiddleware.js');
const dotMide = require('../middleware/dotMiddleware');
const fileDelete = require('../utils/file-util');
const projectMiddle = require('../middleware/projectMiddleware');
const projectController = require('../controllers/projectController');

// router.post('/api/file/uploadxlsx', upload.single('file'), excelWorker.uploadFile);

router.post(
  '/apiv1/csv/newdtfile',
  upload.single('file'),
  projectMiddle.setHeader,
  csvWork.uploadFile,
  projectMiddle.insertCsv,
  // fileDelete.deleteFile,
  // dotMide.setProjectId,
  // dotMide.updateCsvFileName,
  dotMide.updateGeom,
  dotMide.updateDistFromSites,
  dotMide.updateDistFromRef,
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
