const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../config/multer.config.js');
const excelWorker = require('../controllers/xlsxController.js');

router.post('/api/file/upload', upload.single('file'), excelWorker.uploadFile);

module.exports = router;
