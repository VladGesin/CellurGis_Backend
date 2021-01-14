const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multer.config.js');
const excelWorker = require('../controllers/xlsxController.js');
const csvWork = require('../middleware/csvMiddleware.js');
const siteMide = require('../middleware/siteMiddleware');
const chartControllr = require('../controllers/chartsController');

// router.post('/api/file/uploadxlsx', upload.single('file'), excelWorker.uploadFile);
router.post(
	'/api/file/uploadcsv',
	upload.single('file'),
	csvWork.uploadFile,
	siteMide.UpdateDataBaseFromMongoos,
	chartControllr.setChartTable
);

module.exports = router;
