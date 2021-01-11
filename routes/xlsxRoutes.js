const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multer.config.js');
const excelWorker = require('../controllers/xlsxController.js');
const csvWork = require('../controllers/csvController.js');
const siteController = require('../controllers/sitesController');
const chartControllr = require('../controllers/chartsController');

// router.post('/api/file/uploadxlsx', upload.single('file'), excelWorker.uploadFile);
router.post(
	'/api/file/uploadcsv',
	upload.single('file'),
	csvWork.uploadFile,
	siteController.UpdateDataBaseFromMongoos,
	chartControllr.setChartTable
);

module.exports = router;
