const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multer.config.js');
const excelWorker = require('../controllers/xlsxController.js');
const excelWork = require('../controllers/csvController.js');

router.post('/api/file/uploadxlsx', upload.single('file'), excelWorker.uploadFile);
router.post('/api/file/uploadcsv', upload.single('file'), excelWork.uploadFile);

module.exports = router;
